import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SessionModule } from "./modules/session/session.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, SessionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
