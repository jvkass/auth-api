export class ValidateSessionLoginCommand {
  constructor(props: ValidateSessionLoginCommand) {
    this.accessToken = props.accessToken;
  }

  readonly accessToken: string;
}
