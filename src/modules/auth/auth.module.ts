import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { InfrastructureModule } from "@src/infrastructure/infrastructure.module";
import { USER_SERVICE_NAME } from "@libs/protos/proto/user.pb";
import { MongooseModule } from "@nestjs/mongoose";
import process from "process";
import { AuthLoginMailHttpController } from "./commands/auth-login/auth-login-mail.http.controller";
import { AuthLoginMailService } from "./commands/auth-login/auth-login-mail.service";
import { SessionModule } from "../session/session.module";

const httpControllers = [AuthLoginMailHttpController];

const grpcControllers = [""];

const commandHandlers = [AuthLoginMailService];

// const repositories = [];

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: USER_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: configService.getOrThrow<string>(
              "GRPC_USER_API_PROTO_PACKAGE",
            ),
            url: configService.getOrThrow<string>("GRPC_USER_API"),
            protoPath: configService.getOrThrow<string>(
              "GRPC_USER_API_PROTO_PATH",
            ),
          },
        }),
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const URI = configService.get<string>("MONGODB_HOST");

        return {
          uri: URI,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    InfrastructureModule,
    SessionModule,
  ],
  controllers: [
    // ...grpcControllers,
    ...httpControllers,
  ],
  providers: [
    ...commandHandlers,
    // ...repositories
  ],
})
export class AuthModule {}
