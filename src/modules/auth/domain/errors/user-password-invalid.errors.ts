import { AbstractError } from "@src/libs/exceptions/abstract.error";

export class UserPasswordInvalidError extends AbstractError {
  constructor(metadata: unknown) {
    super(metadata, "APIE007");
  }
}
