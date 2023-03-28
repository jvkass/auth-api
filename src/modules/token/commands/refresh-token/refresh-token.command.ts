export class RefreshTokenCommand {
  constructor(props: RefreshTokenCommand) {
    this.accessToken = props.accessToken;
    this.accessTokenCompare = props.accessTokenCompare;
    this.refreshToken = props.refreshToken;
    this.refreshTokenCompare = props.refreshTokenCompare;
    this.userId = props.userId;
    this.name = props.name;
  }

  readonly accessToken: string;

  readonly accessTokenCompare: string;

  readonly refreshToken: string;

  readonly refreshTokenCompare: string;

  readonly userId: string;

  readonly name: string;
}
