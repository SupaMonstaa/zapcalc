import SR from 'seedrandom';

export default abstract class Operation {
  public digit1 = 0;

  public digit2 = 0;

  public abstract sign: string;

  public abstract color: string;

  public static prng: Function;

  constructor(level: number) {
    if (!Operation.prng) {
      // seed random with date to get real random.
      // use a random lib with seed to allow later someone to launch
      // exactly the same sequence than anoter (battle mode)
      Operation.prng = SR(Date.now().toString());
    }
    // loop until the generated digits generates
    // an operation that fit the level
    do {
      this.generateDigits(level);
    } while (this.digit1 > 99
      || this.digit2 > 99
      || this.result > 99
      || this.stars > level);
  }

  static rand(min: number, max: number): number {
    return Math.floor(min + Operation.prng() * (max - min));
  }

  /* eslint-disable class-methods-use-this */
  public get result(): number {
    return 0;
  }

  public toString(): string {
    return `${this.digit1} ${this.sign} ${this.digit2}`;
  }

  protected abstract generateDigits(level: number): void;

  /* eslint-disable class-methods-use-this */
  public get stars(): number {
    return 0;
  }
}
