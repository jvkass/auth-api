import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CryptoService } from "@src/infrastructure/providers/crypto.provider";
import { GenerateTokenCommand } from "./generate-token.command";
import { GenerateTokenResponse } from "./generate-token.response.dto";

@Injectable()
export class GenerateTokenService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handle(command: GenerateTokenCommand): Promise<GenerateTokenResponse> {
    const payload = { ...command };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET"),
      expiresIn: `${this.configService.get(
        "JWT_ACCESS_TOKEN_EXPIRATION_TIME",
      )}`,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn: `${this.configService.get(
        "JWT_REFRESH_TOKEN_EXPIRATION_TIME",
      )}`,
    });

    const refreshTokenEncrypt = await this.cryptoService.encrypt(refreshToken);

    return { access_token: accessToken, refresh_token: refreshTokenEncrypt };
  }
}
