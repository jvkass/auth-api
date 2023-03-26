import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MaxLength, MinLength, ValidateIf } from "class-validator";

export class AuthLoginMailRequest {
  @ApiProperty({
    example: "john@gmail.com",
    description: "User email address",
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  @ValidateIf((o) => !o.email)
  readonly email: string;

  @ApiProperty({
    example: "74F5Kx13!e3A",
    description: "Password for user",
  })
  @MinLength(5)
  readonly password: string;
}
