import Operation from './Operation';

export default class Substraction extends Operation {
  protected sign = '-';

  protected generateDigits(level: number): void {
    this.digit1 = Operation.rand(10 * level, 20 * level);
    this.digit2 = Operation.rand(1, this.digit1);
  }

  public get result(): number {
    return this.digit1 - this.digit2;
  }
}
