<template>
  <div class="calc-screen">
    <canvas id="screen-canvas"
    width="500" height="120" :aria-label="ariaLabel">
    </canvas>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import pixelate from '@/mixins/pixelate';

@Component
export default class CalcScreen extends Vue {
  private canvas!: HTMLCanvasElement;

  private ctx!: CanvasRenderingContext2D;

  private pixelW = 5;

  private starImage9 = new Image();

  private starImage7 = new Image();

  private starImage19 = new Image();

  private animTimeout = 0;

  @Prop({ type: Number, required: true })
  public totalScore!: number;

  @Prop({ type: Number, required: true })
  public digit1!: number;

  @Prop({ type: Number, required: true })
  public digit2!: number;

  @Prop({ type: String, required: true })
  public sign!: string;

  @Prop({ type: String })
  public color!: string;

  @Prop({ type: Number, required: true })
  public stars!: number;

  @Prop({ type: Number, required: true })
  public score!: number;

  @Prop({ type: Number })
  private gameTimeLeft!: number;

  @Prop({ type: String })
  private ariaLabel!: string;

  created() {
    /* this.starImage9.addEventListener('load', () => {
      console.log('image loaded');
    });
    this.starImage9.addEventListener('error', (e) => {
      console.log(e);
    }); */
    // TODO : ensure images are loaded
    this.starImage7.src = '/img/icons/star7.png';
    this.starImage9.src = '/img/icons/star9.png';
    this.starImage19.src = '/img/icons/star19.png';
  }

  mounted() {
    this.canvas = this.$el.querySelector('#screen-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.imageSmoothingEnabled = false;
    this.renderScreen();
    /* this.$nextTick(() => {
      console.log('nextTick');
      this.pixelate();
    }); */
  }

  @Watch('gameTimeLeft')
  @Watch('score')
  @Watch('ariaLabel')
  @Watch('totalScore')
  renderScreen() {
    this.clearScreen();
    if (this.totalScore >= 0) {
      this.drawTotalScore(true);
    } else {
      if (this.animTimeout) {
        clearTimeout(this.animTimeout);
      }
      this.drawScore();
      this.drawGameTimeLeft();
      this.drawOperation();
      this.pixelate();
    }
  }

  private clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawTotalScore(big: boolean): void {
    const score = `${this.totalScore}`;
    const lg = 12 * score.length;
    this.clearScreen();
    this.drawText(score, 39 - 0.5 * lg, 2, true, '#000000');
    if (big) {
      this.drawImage(this.starImage19, 42 + 0.5 * lg, 2);
    } else {
      this.drawImage(this.starImage9, 45 + 0.5 * lg, 6);
    }
    this.pixelate();
    this.animTimeout = setTimeout(() => this.drawTotalScore(!big), 400);
  }

  drawScore() {
    if (this.score >= 0) {
      this.drawImage(this.starImage9, 73, 14);
      this.drawText(`${this.score}`, 82, 16, false, '#000000');
    }
  }

  drawGameTimeLeft() {
    if (this.gameTimeLeft >= 0) {
      this.drawText(`${this.gameTimeLeft}`, 82, 2, false, '#000000');
      this.pixelate();
    }
  }

  drawOperation() {
    const X = 11;
    const Y = 2;
    console.log('operationChanged');
    // const txtH = 103.2;
    // this.ctx.font = `${txtH}px zapmaxi`;
    // this.ctx.fillStyle = this.color;
    // this.ctx.textAlign = 'start';
    // this.ctx.textBaseline = 'top';
    let textIndex = X;
    this.drawText(`${this.digit1} `, textIndex, Y, true, this.color);
    textIndex += this.digit1 >= 10 ? 24 : 14;
    this.drawText(`${this.sign} `, textIndex, Y - 1, true, this.color);
    textIndex += 13;
    this.drawText(`${this.digit2}`, textIndex, Y, true, this.color);
    for (let i = 0; i < this.stars; i += 1) {
      this.drawImage(this.starImage7, 2, 16 - i * 7);
    }
  }

  private x(incX: number): number {
    return this.pixelW * incX;
  }

  private y(incY: number): number {
    return this.pixelW * incY + 3;
  }

  private drawText(text: string, x: number, y: number, big: boolean, color: string): void {
    // const txtH = 50; // h for nano
    const txtH = big ? 103.2 : 25;
    const incY = big ? 5 : 2;
    this.ctx.font = `${txtH}px ${big ? 'zapmaxi' : 'zapmini'}`;
    // const w = this.pixelW * (text.length * (big ? 12 : 6));
    // const h = this.pixelW * (big ? 15 : 5);
    // this.ctx.fillStyle = '#eeeeee';
    // this.ctx.fillRect(this.x(x), this.y(y) + incY - 5, w, h);
    this.ctx.fillStyle = color;
    this.ctx.textAlign = 'start';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(`${text}`, this.x(x), this.y(y) + incY);
  }

  private drawImage(image: HTMLImageElement, x: number, y: number): void {
    this.ctx.drawImage(image, this.x(x), this.y(y) - 2,
      image.width * this.pixelW, image.height * this.pixelW);
  }

  private pixelate() {
    const options = {
      pixelWidth: 5,
      pixelHeight: 5,
      thresholdMax: 200,
      thresholdMin: 30,
      grid: true,
    };
    const imageData = this.ctx.getImageData(
      0, 0, this.canvas.width, this.canvas.height,
    );
    pixelate(imageData, imageData, options);
    this.ctx.putImageData(imageData, 0, 0);
  }
}
</script>

<style scoped lang="scss">
  $screen-bg: #ccc;
  .calc-screen {
    position:relative;
    margin: 1vh 2vh 2vh;
    background: $screen-bg;
    border-radius: 1vh;
    box-sizing:border-box;
    box-shadow: 1px 3px 0 0 darken($screen-bg, 30) inset;
    text-shadow: 1px 4px 0px darken($screen-bg, 30);

    #screen-canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
