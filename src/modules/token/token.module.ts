import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InfrastructureModule } from "@src/infrastructure/infrastructure.module";
import { JwtService } from "@nestjs/jwt";
import { GenerateTokenService } from "./commands/generate-token/generate-token.service";
import { DecodeTokenService } from "./commands/decode-token/decode-token.service";
import { RefreshTokenService } from "./commands/refresh-token/refresh-token.service";
import { ValidateTokenService } from "./commands/validate-token/validate-token.service";

const commandHandlers = [
  GenerateTokenService,
  DecodeTokenService,
  RefreshTokenService,
  ValidateTokenService,
  JwtService,
];

@Module({
  imports: [ConfigModule, InfrastructureModule],
  controllers: [],
  providers: [...commandHandlers],
  exports: [...commandHandlers],
})
export class TokenModule {}
