import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DecodeTokenCommand } from "./decode-token.command";

@Injectable()
export class DecodeTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async handle(command: DecodeTokenCommand): Promise<any> {
    const payload = { ...command };

    return this.jwtService.decode(payload.token);
  }
}
