import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { GenerateTokenResponse } from "@src/modules/token/commands/generate-token/generate-token.response.dto";
import { SessionRepository } from "@src/modules/session/database/session.repository";
import { GenerateTokenCommand } from "@src/modules/token/commands/generate-token/generate-token.command";
import { GenerateTokenService } from "@src/modules/token/commands/generate-token/generate-token.service";
import { CreateSessionLoginMailCommand } from "./create-session-login-mail.command";

@Injectable()
export class CreateSessionLoginMailService {
  constructor(
    private readonly generateTokenService: GenerateTokenService,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async handle(
    command: CreateSessionLoginMailCommand,
  ): Promise<GenerateTokenResponse> {
    const { userId, name } = command;

    await this.sessionRepository.inactiveSessionByUserId(userId);

    const tokenService = await this.generateTokenService.handle(
      new GenerateTokenCommand({
        userId,
        name,
      }),
    );

    await this.sessionRepository.save({
      is_active: true,
      access_token: tokenService.access_token,
      refresh_token: tokenService.refresh_token,
      name,
      user_id: userId,
    });

    return tokenService;
  }
}
