import { Injectable } from "@nestjs/common";
import { DecodeTokenCommand } from "@src/modules/token/commands/decode-token/decode-token.command";
import { DecodeTokenService } from "@src/modules/token/commands/decode-token/decode-token.service";
import { ValidateTokenCommand } from "@src/modules/token/commands/validate-token/validate-token.command";
import { ValidateTokenService } from "@src/modules/token/commands/validate-token/validate-token.service";
import { StrategyValidationToken } from "@src/modules/token/domain/enums/strategy-validation-token.enum";
import { TokenUnmatchingError } from "@src/modules/token/errors/token-unmatching.errors";
import { ValidateSessionLoginResponse } from "@src/libs/protos/proto/session.pb";
import { ValidateSessionLoginCommand } from "./validate-session-login.command";

@Injectable()
export class ValidateSessionLoginService {
  constructor(
    private readonly decodeTokenService: DecodeTokenService,
    private readonly validateTokenService: ValidateTokenService,
  ) {}

  async handle(
    command: ValidateSessionLoginCommand,
  ): Promise<ValidateSessionLoginResponse> {
    const { accessToken } = command;
    try {
      const isValidToken = await this.validateTokenService.handle(
        new ValidateTokenCommand({
          token: accessToken,
          strategyValidationToken: StrategyValidationToken.ACCESS_TOKEN,
        }),
      );

      if (!isValidToken) {
        throw new TokenUnmatchingError("").code;
      }

      const tokenDecode = await this.decodeTokenService.handle(
        new DecodeTokenCommand({
          token: accessToken,
        }),
      );

      return {
        isValid: isValidToken,
        error: "",
        sessionLogin: {
          userId: tokenDecode.userId,
        },
      };
    } catch (ex) {
      return {
        isValid: false,
        error: String(ex),
        sessionLogin: {
          userId: "",
        },
      };
    }
  }
}
