<template>
  <div class="zap-calc">
    <header>
      <menu>
        <OperationSelect :initValue="operationKind" class="operation-select" @change="onOperationChange"></OperationSelect>
        <LevelSelect :initValue="level ? level : 0" class="level-select" @change="onLevelChange"></LevelSelect>
        <StartButton :gameTimeLeft="gameTimeLeft" :gameDuration="gameDuration" v-on:click="startGame"></StartButton>
      </menu>
    </header>
    <CalcScreen v-if="typeof operationKind !== 'undefined'"
      :gameStarted="gameStarted"
      :gameDuration="gameDuration"
      :totalScore="totalScore"
      :newBestScoreMessage="newBestScoreMessage"
      :digit1="operation.digit1"
      :digit2="operation.digit2"
      :sign="operation.sign"
      :color="operation.color"
      :ariaLabel="ariaLabel"
      :stars="stars"
      :score="score"
      :gameTimeLeft="gameTimeLeft"
      :level="level"
      :operationKind="operationKind"
      class="calc-screen"></CalcScreen>
    <KeyboardItem
    :showResult="showResult"
    :result="operation.result"
    @change="onKeyboardValue"
    class="keyboard-item">
    </KeyboardItem>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import KeyboardItem from '@/components/KeyboardItem/'
import LevelSelect from '@/components/LevelSelect'
import OperationSelect from '@/components/OperationSelect'
import StartButton from '@/components/StartButton'
import CalcScreen from '@/components/CalcScreen'
import Operation from '@/types/Operation'
import addScore from '@/mixins/bestScore'
import OperationKind from '@/types/OperationKind'
import OperationFactory from '@/mixins/OperationFactory'
import './ZapCalcPage.scss'

@Options({
  components: {
    CalcScreen,
    KeyboardItem,
    LevelSelect,
    OperationSelect,
    StartButton
  }
})
export default class ZapCalcPage extends Vue {
  private level!: number;

  private showResult = false;

  private operationKind!: OperationKind;

  private operation!: Operation;

  private totalScore = -1;

  private nextOperation = true;

  private gameStarted = false;

  private gameDuration = 120;

  private ariaLabel = '';

  private score = -1;

  private gameTimeLeft = -1;

  private gameTimeout!: number;

  private newBestScoreMessage = '';

  private stars = 0;

  created (): void {
    const LSlevel = localStorage.getItem('level')
    this.level = LSlevel ? parseInt(LSlevel, 0) : 2
    this.operationKind = localStorage.getItem('operationKind')
      ? localStorage.getItem('operationKind') as OperationKind : OperationKind.mix
    this.currentOperation = OperationFactory.getOperationClass(this.operationKind, this.level)
  }

  onKeyboardValue (value: number): void {
    if (!this.gameStarted) {
      return
    }

    if (this.operation.result === value) {
      // correct answer
      this.nextOperation = true
      if (this.gameStarted) {
        this.score += this.stars
      }
    } else {
      const zapCalc = this.$el as HTMLElement
      zapCalc.classList.add('shake')
      setTimeout(() => {
        zapCalc.classList.remove('shake')
      }, 1000)
      if (!this.nextOperation) {
        this.showResult = true
        this.stars = 0
      } else {
        this.nextOperation = false
      }
    }
    if (this.nextOperation) {
      this.showResult = false
      this.currentOperation = OperationFactory.getOperationClass(this.operationKind, this.level)
    }
  }

  private get currentOperation (): Operation {
    return this.operation
  }

  private set currentOperation (v: Operation) {
    this.operation = v
    this.stars = v.stars
    this.setAriaLabel()
  }

  private setAriaLabel (): void {
    this.ariaLabel = `${this.level} ${this.operationKind} ${this.operation.digit1}${this.operation.sign}${this.operation.digit2}`
  }

  private startGame (): void {
    this.score = 0
    this.showResult = false
    this.totalScore = -1
    this.gameStarted = true
    this.gameTimeLeft = this.gameDuration
    this.currentOperation = OperationFactory.getOperationClass(this.operationKind, this.level)
    clearTimeout(this.gameTimeout)
    this.gameTimeout = setTimeout(this.gameTick, 1000)
  }

  private gameTick (): void {
    this.gameTimeLeft -= 1
    if (this.gameTimeLeft === 0) {
      this.endGame()
      this.gameTimeout = 0
    } else {
      this.gameTimeout = setTimeout(this.gameTick, 1000)
    }
  }

  private endGame (): void {
    this.gameTimeLeft = -1
    this.stars = 0
    this.gameStarted = false
    // send totalScore to screen
    this.totalScore = this.score
    const [rank] = addScore(this.operationKind, this.level, this.totalScore)
    if (rank >= 0) {
      // best score !
      this.newBestScoreMessage = `#${rank + 1}`
    } else {
      this.newBestScoreMessage = ''
    }
  }

  onLevelChange (level: number): void {
    localStorage.setItem('level', `${level}`)
    this.level = level
    this.setAriaLabel()
  }

  onOperationChange (operationKind: OperationKind): void {
    localStorage.setItem('operationKind', operationKind)
    this.operationKind = operationKind
    this.setAriaLabel()
  }
}
</script>
