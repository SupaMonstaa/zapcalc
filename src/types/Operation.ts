export default abstract class Operation {
  protected digit1 = 0;

  protected digit2 = 0;

  protected abstract sign = '+';

  constructor(level: number) {
    this.generateDigits(level);
  }

  static rand(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min));
  }

  public abstract get result(): number;

  public toString(): string {
    return `${this.digit1} ${this.sign} ${this.digit2}`;
  }

  protected abstract generateDigits(level: number): void;
}
