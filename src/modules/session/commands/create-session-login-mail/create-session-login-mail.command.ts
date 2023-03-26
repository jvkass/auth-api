export class CreateSessionLoginMailCommand {
  constructor(props: CreateSessionLoginMailCommand) {
    this.name = props.name;
    this.userId = props.userId;
  }

  readonly name: string;

  readonly userId: string;
}
