import Operation from './Operation';

export default class Multiplication extends Operation {
  public sign = '×';

  public color = '#303080';

  protected generateDigits(level: number): void {
    this.digit1 = Operation.rand(level, 1 + 3 * level);
    this.digit2 = Operation.rand(2, 10);
    this.stars = 1;
    if (this.digit1 >= 7 && this.digit2 >= 7) {
      this.stars = 3;
    } else if (this.digit1 >= 4 && this.digit2 >= 5) {
      this.stars = 2;
    } else {
      this.stars = 1;
    }
  }

  public get result(): number {
    return this.digit1 * this.digit2;
  }
}
