import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InfrastructureModule } from "@src/infrastructure/infrastructure.module";
import { JwtService } from "@nestjs/jwt";
import { GenerateTokenService } from "./commands/generate-token/generate-token.service";

const commandHandlers = [GenerateTokenService, JwtService];

@Module({
  imports: [ConfigModule, InfrastructureModule],
  controllers: [],
  providers: [...commandHandlers],
  exports: [...commandHandlers],
})
export class TokenModule {}
