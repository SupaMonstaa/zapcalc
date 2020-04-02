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
  private level = 1;

  private operationKind: OperationKind = OperationKind.multiplication;

  private operation!: Operation;

  public operationStr = '';

  private nextOperation = true;

  created() {
    this.currentOperation = new Addition(1);
    console.log('created');
  }

  onKeyboardValue(value: number): void {
    if (this.operation.result === value) {
      // correct answer
      this.nextOperation = true;
    } else if (!this.nextOperation) {
      // TODO : 2eme faute
      this.nextOperation = true;
      console.log('bravo');
    } else {
      this.nextOperation = false;
      console.log('Eème essai');
    }
    if (this.nextOperation) {
      this.currentOperation = this.operationFactory();
    }
  }

  public get currentOperation(): Operation {
    return this.operation;
  }

  public set currentOperation(v: Operation) {
    this.operation = v;
    this.operationStr = v.toString();
  }

  onLevelChange(level: number) {
    this.level = level;
  }

  onOperationChange(operationKind: OperationKind) {
    this.operationKind = operationKind;
    console.log(operationKind);
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
