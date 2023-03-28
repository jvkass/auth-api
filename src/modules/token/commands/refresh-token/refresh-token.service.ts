import { Injectable } from "@nestjs/common";
import { CryptoService } from "@src/infrastructure/providers/crypto.provider";
import { RefreshTokenCommand } from "./refresh-token.command";
import { GenerateTokenResponse } from "../generate-token/generate-token.response.dto";
import { GenerateTokenService } from "../generate-token/generate-token.service";
import { GenerateTokenCommand } from "../generate-token/generate-token.command";
import { ValidateTokenService } from "../validate-token/validate-token.service";
import { ValidateTokenCommand } from "../validate-token/validate-token.command";
import { AccessTokenInvalidError } from "../../errors/access-token-invalid.errors";
import { RefreshTokenInvalidError } from "../../errors/refresh-token-invalid.errors";
import { StrategyValidationToken } from "../../domain/enums/strategy-validation-token.enum";
import { DecodeTokenService } from "../decode-token/decode-token.service";
import { DecodeTokenCommand } from "../decode-token/decode-token.command";

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly generateToken: GenerateTokenService,
    private readonly validateTokenService: ValidateTokenService,
    private readonly decodeTokenService: DecodeTokenService,
  ) {}

  async handle(command: RefreshTokenCommand): Promise<GenerateTokenResponse> {
    const payload = { ...command };

    const decodeToken = await this.decodeTokenService.handle(
      new DecodeTokenCommand({
        token: payload.accessToken,
      }),
    );

    const isAccessTokenValid = decodeToken.userId === payload.userId;

    if (!isAccessTokenValid) {
      throw new AccessTokenInvalidError("");
    }

    const refreshTokenDecrypt = await this.cryptoService.decrypt(
      payload.refreshToken,
    );

    const isRefreshTokenValid = await this.validateTokenService.handle(
      new ValidateTokenCommand({
        token: refreshTokenDecrypt,
        strategyValidationToken: StrategyValidationToken.REFRESH_TOKEN,
      }),
    );

    if (!isRefreshTokenValid) {
      throw new RefreshTokenInvalidError("");
    }

    return this.generateToken.handle(
      new GenerateTokenCommand({
        userId: payload.userId,
        name: payload.name,
      }),
    );
  }
}
