import { Component, Vue } from 'vue-property-decorator';
import KeyboardItem from '@/components/KeyboardItem/';
import LevelSelect from '@/components/LevelSelect';
import OperationSelect from '@/components/OperationSelect';
import CalcScreen from '@/components/CalcScreen';
import Operation from '@/types/Operation';
import Addition from '@/types/Addition';
import Multiplication from '@/types/Multiplication';
import Substraction from '@/types/Substraction';
import shuffle from '@/mixins/shuffle';
import OperationKind from '@/types/OperationKind';
import WithRender from './ZapCalcPage.html';
import './ZapCalcPage.scss';

@WithRender
@Component({
  components: {
    CalcScreen,
    KeyboardItem,
    LevelSelect,
    OperationSelect,
  },
})
export default class ZapCalcPage extends Vue {
  private level!: number;

  private showResult = false;

  private operationKind!: OperationKind;

  private operation!: Operation;

  private totalScore = -1;

  private nextOperation = true;

  private gameStarted = false;

  private gameDuration = 180;

  private ariaLabel = '';

  private score = -1;

  private gameTimeLeft = -1;

  private gameTimeout!: number;

  created() {
    this.level = localStorage.level ? parseInt(localStorage.level, 0) : 2;
    this.operationKind = localStorage.operationKind
      ? localStorage.operationKind : OperationKind.multiplication;
    this.currentOperation = this.operationFactory();
  }

  onKeyboardValue(value: number): void {
    if (this.operation.result === value) {
      // correct answer
      this.nextOperation = true;
      if (this.gameStarted) {
        this.score += this.operation.stars;
      }
    } else {
      const zapCalc = this.$el as HTMLElement;
      zapCalc.classList.add('shake');
      setTimeout(() => {
        zapCalc.classList.remove('shake');
      }, 1000);
      if (!this.nextOperation) {
        this.showResult = true;
      } else {
        this.nextOperation = false;
      }
    }
    if (this.nextOperation) {
      this.showResult = false;
      this.currentOperation = this.operationFactory();
    }
  }

  private get currentOperation(): Operation {
    return this.operation;
  }

  private set currentOperation(v: Operation) {
    this.operation = v;
    this.ariaLabel = `${this.operation.digit1} ${this.operation.sign} ${this.operation.digit2}`;
  }

  private startGame(): void {
    this.score = 0;
    this.totalScore = -1;
    this.gameStarted = true;
    this.gameTimeLeft = this.gameDuration;
    clearTimeout(this.gameTimeout);
    this.gameTimeout = setTimeout(this.gameTick, 1000);
  }

  private gameTick(): void {
    this.gameTimeLeft -= 1;
    if (this.gameTimeLeft === 0) {
      this.endGame();
    } else {
      this.gameTimeout = setTimeout(this.gameTick, 1000);
    }
  }

  private endGame() {
    this.gameStarted = false;
    // send totalScore to screen
    this.totalScore = this.score;
  }

  onLevelChange(level: number) {
    localStorage.level = level;
    this.level = level;
  }

  onOperationChange(operationKind: OperationKind) {
    localStorage.operationKind = operationKind;
    this.operationKind = operationKind;
  }

  operationFactory(): Operation {
    const opKinds: {[key: string]: Function} = {};
    opKinds[OperationKind.addition] = () => Addition;
    opKinds[OperationKind.multiplication] = () => Multiplication;
    opKinds[OperationKind.substraction] = () => Substraction;
    opKinds[OperationKind.mix] = () => shuffle([Substraction, Multiplication, Addition]).pop();

    const OperationClass = opKinds[this.operationKind]();
    return new OperationClass(this.level);
  }
}
