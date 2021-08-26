<template>
  <div class="keyboard-item">
    <table>
      <tr v-for="(numbers, index) in tens" v-bind:key="index">
        <td v-for="nb in numbers" v-bind:key="nb">
          <KeyboardKey :showResult="showResult" :class="index % 2 ? 'odd' : 'even'" v-on:change="onKeyboardPressed" :value="nb" :correct="result === nb"></KeyboardKey>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import KeyboardKey from '@/components/KeyboardKey'
import './KeyboardItem.scss'

@Options({
  components: {
    KeyboardKey
  },
  props: {
    result: Number,
    showResult: Boolean
  }
})
export default class KeyboardItem extends Vue {
  private result!: number;

  private showResult!: boolean;

  public tens: number[][] = [];

  created (): void {
    for (let i = 0; i <= 9; i += 1) {
      const ten: number[] = []
      for (let j = 0; j <= 9; j += 1) {
        ten.push(10 * i + j)
      }
      this.tens.push(ten)
    }
  }

  onKeyboardPressed (keyValue: number): void {
    this.$emit('change', keyValue)
  }
}
</script>
