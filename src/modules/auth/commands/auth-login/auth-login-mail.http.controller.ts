import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Headers,
  BadRequestException,
  HttpException,
  HttpCode,
  Inject,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { routesV1 } from "@src/infrastructure/configs/app.routes";
import { AbstractError } from "@src/libs/exceptions/abstract.error";
import { GenerateTokenResponse } from "@src/modules/token/commands/generate-token/generate-token.response.dto";
import { match, Result } from "oxide.ts/dist";
import { UserPasswordInvalidError } from "../../domain/errors/user-password-invalid.errors";
import { AuthLoginMailCommand } from "./auth-login-mail.command";
import { AuthLoginMailRequest } from "./auth-login-mail.request.dto";
import { AuthLoginMailService } from "./auth-login-mail.service";

@Controller(routesV1.version)
export class AuthLoginMailHttpController {
  constructor(private readonly service: AuthLoginMailService) {}

  @Post(`${routesV1.auth.loginMail}`)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login via email ou password" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GenerateTokenResponse,
  })
  @ApiResponse({
    status: HttpStatus.TOO_MANY_REQUESTS,
    description: "quando o usuário ficar bloqueado",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async login(
    @Body() body: AuthLoginMailRequest,
  ): Promise<GenerateTokenResponse> {
    const command = new AuthLoginMailCommand({
      email: body.email,
      password: body.password,
    });

    const result: Result<GenerateTokenResponse, AbstractError> =
      await this.service.handle(command);

    return match(result, {
      Ok: (response: GenerateTokenResponse) => response,
      Err: (error: AbstractError) => {
        if (error instanceof UserPasswordInvalidError) {
          throw new BadRequestException(error.code);
        }

        throw error;
      },
    });
  }
}
