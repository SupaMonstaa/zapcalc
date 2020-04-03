import Operation from './Operation';

export default class Multiplication extends Operation {
  public sign = '×';

  protected generateDigits(level: number): void {
    this.digit1 = Operation.rand(level, 4 + 2 * level);
    this.digit2 = Operation.rand(2, 10);
  }

  public get result(): number {
    return this.digit1 * this.digit2;
  }
}
