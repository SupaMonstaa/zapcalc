import Operation from './Operation';

export default class Substraction extends Operation {
  public sign = '-';

  public color = '#ff0000';

  protected generateDigits(level: number): void {
    this.digit1 = Operation.rand(10 * level, 20 * level);
    this.digit2 = Operation.rand(1, this.digit1);
    this.stars = 1;
    if (this.digit1 >= 20 && this.digit2 >= 20) {
      this.stars = (this.digit1 % 10 === 0 || this.digit2 % 10 === 0) ? 2 : 3;
    } else if (this.digit1 >= 10 && this.digit2 >= 10) {
      this.stars = (this.digit1 % 10 === 0 || this.digit2 % 10 === 0) ? 1 : 2;
    } else {
      this.stars = 1;
    }
  }

  public get result(): number {
    return this.digit1 - this.digit2;
  }
}
