export default abstract class Operation {
  public digit1 = 0;

  public digit2 = 0;

  public abstract sign: string;

  public abstract color: string;

  public stars = 1;

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
