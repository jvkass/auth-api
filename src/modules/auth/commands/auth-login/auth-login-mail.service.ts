import { Inject, Injectable } from "@nestjs/common";
import { GenerateTokenResponse } from "@src/modules/token/commands/generate-token/generate-token.response.dto";
import { Err, Ok, Result } from "oxide.ts/dist";
import { CreateSessionLoginMailService } from "@src/modules/session/commands/create-session-login-mail/create-session-login-mail.service";
import { CreateSessionLoginMailCommand } from "@src/modules/session/commands/create-session-login-mail/create-session-login-mail.command";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { CryptoService } from "@src/infrastructure/providers/crypto.provider";
import { DomainError } from "@src/libs/ddd/domain/enums/domain-error.enum";
import {
  UserResponse,
  UserServiceClient,
  USER_SERVICE_NAME,
} from "@src/libs/protos/proto/user.pb";
import { AbstractError } from "@src/libs/exceptions/abstract.error";
import { AuthLoginMailCommand } from "./auth-login-mail.command";
import { UserPasswordInvalidError } from "../../domain/errors/user-password-invalid.errors";

@Injectable()
export class AuthLoginMailService {
  private userServiceClient: UserServiceClient;

  constructor(
    @Inject(USER_SERVICE_NAME) private clientUser: ClientGrpc,
    private readonly createSessionLoginMailService: CreateSessionLoginMailService,
    private readonly cryptoService: CryptoService,
  ) {}

  onModuleInit(): void {
    this.userServiceClient =
      this.clientUser.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async handle(
    command: AuthLoginMailCommand,
  ): Promise<Result<GenerateTokenResponse, AbstractError>> {
    const { email, password } = command;

    try {
      const decryptPassword = await this.cryptoService.decrypt(password);

      const userMailPasswordResponse: UserResponse = await lastValueFrom(
        this.userServiceClient.findUserByMailPassword({
          email,
          password: decryptPassword,
        }),
      );

      const { name, userId } = userMailPasswordResponse.user!;
      const isInvalidCred =
        userMailPasswordResponse.error === DomainError.APIE002;

      if (isInvalidCred) {
        return Err(new UserPasswordInvalidError(""));
      }

      const createSessionLogin =
        await this.createSessionLoginMailService.handle(
          new CreateSessionLoginMailCommand({
            name,
            userId,
          }),
        );

      return Ok(createSessionLogin);
    } catch (ex) {
      return Err(new UserPasswordInvalidError(""));
    }
  }
}
