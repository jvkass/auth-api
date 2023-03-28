import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { ValidateTokenCommand } from "./validate-token.command";
import { StrategyValidationToken } from "../../domain/enums/strategy-validation-token.enum";

@Injectable()
export class ValidateTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handle(command: ValidateTokenCommand): Promise<boolean> {
    const payload = { ...command };

    if (
      payload.strategyValidationToken === StrategyValidationToken.ACCESS_TOKEN
    ) {
      return !!this.jwtService.verify(payload.token, {
        secret: await this.configService.getOrThrow("JWT_ACCESS_TOKEN_SECRET"),
      });
    }

    if (
      payload.strategyValidationToken === StrategyValidationToken.REFRESH_TOKEN
    ) {
      return !!this.jwtService.verify(payload.token, {
        secret: await this.configService.getOrThrow("JWT_REFRESH_TOKEN_SECRET"),
      });
    }

    return false;
  }
}
