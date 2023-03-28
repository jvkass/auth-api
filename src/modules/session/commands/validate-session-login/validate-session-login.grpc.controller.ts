import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import {
  SESSION_PACKAGE_NAME,
  SESSION_SERVICE_NAME,
  ValidateSessionLoginRequest,
  ValidateSessionLoginResponse,
} from "@src/libs/protos/proto/session.pb";
import { ValidateSessionLoginCommand } from "./validate-session-login.command";
import { ValidateSessionLoginService } from "./validate-session-login.service";

@Controller(SESSION_PACKAGE_NAME)
export class ValidateSessionLoginGrpcController {
  constructor(private readonly service: ValidateSessionLoginService) {}

  @GrpcMethod(SESSION_SERVICE_NAME, "ValidateSessionLogin")
  async validateSessionLogin(
    data: ValidateSessionLoginRequest,
  ): Promise<ValidateSessionLoginResponse> {
    const command = new ValidateSessionLoginCommand(data);

    return this.service.handle(command);
  }
}
