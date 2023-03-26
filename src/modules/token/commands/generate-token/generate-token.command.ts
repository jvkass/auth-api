export class GenerateTokenCommand {
  constructor(props: GenerateTokenCommand) {
    this.userId = props.userId;
    this.name = props.name;
  }

  readonly userId: string;

  readonly name: string;
}
