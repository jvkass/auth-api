export class AuthLoginMailCommand {
  constructor(props: AuthLoginMailCommand) {
    this.email = props.email;
    this.password = props.password;
  }

  readonly email: string;

  readonly password: string;
}
