import { DomainError } from "@src/libs/ddd/domain/enums/domain-error.enum";
import { AbstractError } from "@src/libs/exceptions/abstract.error";

const code = DomainError.APIE007;

export class TokenUnmatchingError extends AbstractError {
  constructor(metadata: unknown) {
    super(metadata, code);
  }
}
