import Operation from './Operation';

export default class Addition extends Operation {
  public sign = '+';

  public color = '#308030';

  protected generateDigits(level: number): void {
    this.digit1 = Operation.rand(1, 10 * level);
    this.digit2 = Operation.rand(1, 30 * level - this.digit1);
    this.stars = 1;
    if (this.digit1 >= 20 && this.digit2 >= 20) {
      this.stars = (this.digit1 % 10 === 0 || this.digit2 % 10 === 0) ? 2 : 3;
    } else if ((this.digit1 >= 10 && this.digit2 >= 10)
               || this.digit1 >= 20 || this.digit2 >= 20) {
      this.stars = (this.digit1 % 10 === 0 || this.digit2 % 10 === 0) ? 1 : 2;
    } else {
      this.stars = 1;
    }
  }

  public get result(): number {
    return this.digit1 + this.digit2;
  }
}
