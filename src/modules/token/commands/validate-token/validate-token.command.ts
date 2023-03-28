import { StrategyValidationToken } from "../../domain/enums/strategy-validation-token.enum";

export class ValidateTokenCommand {
  constructor(props: ValidateTokenCommand) {
    this.token = props.token;
    this.strategyValidationToken = props.strategyValidationToken;
  }

  readonly token: string;

  readonly strategyValidationToken: StrategyValidationToken;
}
