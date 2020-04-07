import { Component, Vue, Prop } from 'vue-property-decorator';
import KeyboardKey from '@/components/KeyboardKey';
import WithRender from './KeyboardItem.html';
import './KeyboardItem.scss';

@WithRender
@Component({
  components: {
    KeyboardKey,
  },
})
export default class KeyboardItem extends Vue {
  @Prop({ type: Number })
  private result!: number;

  @Prop({ required: true, type: Boolean })
  private showResult!: boolean;

  public tens: number[][] = [];

  created(): void {
    for (let i = 0; i <= 9; i += 1) {
      const ten: number[] = [];
      for (let j = 1; j <= 10; j += 1) {
        ten.push(10 * i + j);
      }
      this.tens.push(ten);
    }
  }

  onKeyboardPressed(keyValue: number): void {
    this.$emit('change', keyValue);
  }
}
