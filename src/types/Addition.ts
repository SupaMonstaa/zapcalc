import Operation from './Operation';

export default class Addition extends Operation {
  protected sign = '+';

  protected generateDigits(level: number): void {
    this.digit1 = Operation.rand(1, 20 * level);
    this.digit2 = Operation.rand(1, 33 * level - this.digit1);
  }

  public get result(): number {
    return this.digit1 + this.digit2;
  }
}
