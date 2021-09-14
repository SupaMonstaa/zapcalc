<template>
  <div class="calc-screen">
    <canvas id="screen-canvas"
    width="500" height="140" :aria-label="ariaLabel" v-show="loadingStarsCount == 0">
    </canvas>
  </div>
</template>

<script lang="ts">
import OperationFactory from '@/mixins/OperationFactory'
import { Options, Vue } from 'vue-class-component'
import pixelate from '@/mixins/pixelate'
import OperationKind from '@/types/OperationKind'
import starImage19 from '@/assets/images/star19.png'
import starImage9 from '@/assets/images/star9.png'
import starImage7 from '@/assets/images/star7.png'

@Options({
  props: {
    gameStarted: Boolean,
    totalScore: Number,
    digit1: Number,
    digit2: Number,
    sign: String,
    color: String,
    stars: Number,
    score: Number,
    ariaLabel: String,
    newBestScoreMessage: String,
    operationKind: String,
    level: Number
  }
})
export default class CalcScreen extends Vue {
  // props
  public gameStarted!: boolean
  public totalScore!: number
  public digit1!: number
  public digit2!: number
  public sign!: string
  public color!: string
  public stars!: number
  public score!: number
  private ariaLabel!: string
  private newBestScoreMessage!: string
  private operationKind!: string
  private level!: number

  private canvas!: HTMLCanvasElement
  private ctx!: CanvasRenderingContext2D
  private pixelW = 5
  private starImage9 = new Image()
  private starImage7 = new Image()
  private starImage19 = new Image()
  private animTimeout = 0
  private loadingStarsCount = 3

  created ():void {
    // ensure images are loaded
    [this.starImage7, this.starImage9, this.starImage19].forEach(() => {
      this.loadingStarsCount -= 1
    })
    this.starImage7.src = starImage7
    this.starImage9.src = starImage9
    this.starImage19.src = starImage19
  }

  mounted ():void {
    this.canvas = this.$el.querySelector('#screen-canvas') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.ctx.imageSmoothingEnabled = false
    // timeout to let font-face load
    setTimeout(this.renderScreen, 100)
  }

  updated (): void {
    this.renderScreen()
  }

  renderScreen ():void {
    this.clearScreen()
    if (this.score === -1 && !this.gameStarted) {
      // start screen
      this.drawStartScreen()
    } else if (this.totalScore >= 0) {
      this.drawTotalScore(true)
    } else {
      if (this.animTimeout) {
        clearTimeout(this.animTimeout)
        this.animTimeout = 0
      }
      this.drawScore()
      this.drawOperation()
      this.pixelate()
    }
  }

  private clearScreen (): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private drawStartScreen (frame = 0): void {
    clearTimeout(this.animTimeout)
    this.animTimeout = 0
    if (!this.gameStarted) {
      this.animTimeout = setTimeout(() => this.drawStartScreen(frame + 1), 500)
    } else {
      return
    }
    this.clearScreen()
    this.drawText('OPERATION', 2, 4)
    const opLabel = OperationFactory.getLabel(this.operationKind as OperationKind)
    this.drawText(opLabel, 46, 4)
    this.drawText('NIVEAU', 2, 16)
    for (let i = 1; i <= this.level; i += 1) {
      this.drawImage(this.starImage7, 25 + 8 * i, 15)
    }
    if (frame % 2) {
      this.drawText('START^', 69, 4, false, '#ff0000')
    }
    this.pixelate()
  }

  private drawLine (points: number[], color: string):void {
    this.ctx.beginPath()
    this.ctx.lineWidth = this.pixelW
    this.ctx.strokeStyle = color
    this.ctx.moveTo(this.pixelW * points[0], this.pixelW * points[1])
    for (let i = 2; i < points.length - 1; i += 2) {
      this.ctx.setLineDash([2 * this.pixelW, 2 * this.pixelW])
      this.ctx.lineTo(this.pixelW * points[i], this.pixelW * points[i + 1])
      this.ctx.stroke()
    }
  }

  private drawTotalScore (big: boolean): void {
    if (this.totalScore >= 0) {
      this.animTimeout = setTimeout(() => this.drawTotalScore(!big), 400)
      const score = `${this.totalScore}`
      const lg = 12 * score.length
      this.clearScreen()
      this.drawText(score, 40 - 0.5 * lg, 5, true, '#000000')
      if (big) {
        this.drawImage(this.starImage19, 43 + 0.5 * lg, 4)
      } else {
        this.drawImage(this.starImage9, 46 + 0.5 * lg, 8)
      }
      this.drawText(this.newBestScoreMessage, 1, 2, false, '#000000')
      this.pixelate()
    }
  }

  private drawScore (): void {
    if (this.score >= 0) {
      this.drawImage(this.starImage9, 76, 9)
      this.drawText(`${this.score}`, 86, 11, false, '#000000')
    }
  }

  private drawOperation ():void {
    const X = 11
    const Y = 5
    // const txtH = 103.2;
    // this.ctx.font = `${txtH}px zapmaxi`;
    // this.ctx.fillStyle = this.color;
    // this.ctx.textAlign = 'start';
    // this.ctx.textBaseline = 'top';
    let textIndex = X
    this.drawText(`${this.digit1} `, textIndex, Y, true, this.color)
    let spaceW = 0
    if (this.digit1 <= 9) {
      spaceW += 3
    }
    if (this.digit2 <= 9) {
      spaceW += 3
    }
    textIndex += spaceW + (this.digit1 >= 10 ? 25 : 12)
    this.drawText(`${this.sign} `, textIndex, Y - 1, true, this.color)
    textIndex += spaceW + 13
    this.drawText(`${this.digit2}`, textIndex, Y, true, this.color)
    for (let i = 0; i < this.stars; i += 1) {
      this.drawImage(this.starImage7, 2, 19 - i * 8)
    }
  }

  private x (incX: number): number {
    return this.pixelW * incX
  }

  private y (incY: number): number {
    return this.pixelW * incY + 3
  }

  private drawText (text: string, x: number, y: number, big = false, color = '#000000'): void {
    // const txtH = 50; // h for nano
    const txtH = big ? 103.2 : 80/* 25 */
    const incY = big ? 83 : 27
    this.ctx.font = `${txtH}px ${big ? 'zapmaxi' : 'zapmini'}`
    // const w = this.pixelW * (text.length * (big ? 12 : 6));
    // const h = this.pixelW * (big ? 15 : 5);
    // this.ctx.fillStyle = '#eeeeee';
    // this.ctx.fillRect(this.x(x), this.y(y) + incY - 5, w, h);
    this.ctx.fillStyle = color
    // this.ctx.textBaseline = 'top'; // bogus on FF, so disabled and rather use the incY
    this.ctx.fillText(`${text}`, this.x(x), this.y(y) + incY)
  }

  private drawImage (image: HTMLImageElement, x: number, y: number): void {
    this.ctx.drawImage(image, this.x(x), this.y(y) - 2,
      image.width * this.pixelW, image.height * this.pixelW)
  }

  private pixelate ():void {
    const options = {
      pixelWidth: 5,
      pixelHeight: 5,
      thresholdMax: 200,
      thresholdMin: 30,
      grid: true
    }
    const imageData = this.ctx.getImageData(
      0, 0, this.canvas.width, this.canvas.height
    )
    pixelate(imageData, imageData, options)
    this.ctx.putImageData(imageData, 0, 0)
  }
}
</script>

<style scoped lang="scss">
  $screen-bg: #ccc;
  .calc-screen {
    font-family: "zapmaxi";
    position:relative;
    margin: 1% 4% 3%;
    background: $screen-bg;
    border-radius: 10px;
    box-sizing:border-box;
    box-shadow: 1px 3px 0 0 darken($screen-bg, 30) inset;
    text-shadow: 1px 4px 0px darken($screen-bg, 30);

    #screen-canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>
