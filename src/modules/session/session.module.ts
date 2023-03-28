import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { InfrastructureModule } from "@src/infrastructure/infrastructure.module";
import { TokenModule } from "../token/token.module";
import { CreateSessionLoginMailService } from "./commands/create-session-login-mail/create-session-login-mail.service";
import { ValidateSessionLoginGrpcController } from "./commands/validate-session-login/validate-session-login.grpc.controller";
import { ValidateSessionLoginService } from "./commands/validate-session-login/validate-session-login.service";
import { SessionRepository } from "./database/session.repository";
import { SessionLoginSchema } from "./domain/schema/session-login.schema";

const grpcControllers = [ValidateSessionLoginGrpcController];

const repositories = [SessionRepository];

const commandHandlers = [
  CreateSessionLoginMailService,
  ValidateSessionLoginService,
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "SessionLogin", schema: SessionLoginSchema },
    ]),
    InfrastructureModule,
    TokenModule,
  ],
  controllers: [...grpcControllers],
  providers: [...commandHandlers, ...repositories],
  exports: [...commandHandlers],
})
export class SessionModule {}
