<template>
  <button :class="buttonClass" @click="onClick">{{ value }}</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class KeyboardKey extends Vue {
  @Prop({ required: true })
  public value!: number;

  @Prop({ required: true })
  public correct!: boolean;

  @Prop({ type: Boolean })
  private showResult!: boolean;

  get buttonClass() {
    return `${this.correct ? 'correct' : 'wrong'}${this.showResult ? ' show' : ''}`;
  }

  onClick(evt: Event) {
    const button = evt.target as HTMLButtonElement;
    button.classList.add('active');
    setTimeout(() => {
      this.$emit('change', this.value);
      button.classList.remove('active');
    }, 200);
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/mixins.scss';

$button-color: rgb(48, 138, 241);
$button-correct: rgb(102, 187, 69);
$button-wrong: rgb(230, 71, 71);
button {
  @include zap-button($button-color);
  &.even {
    background-color:lighten($button-color, 15);
  }
  &.correct.show {
    background-color: $button-correct;
  }
  &.wrong.show {
    background-color: $button-wrong;
  }

  &.correct:active, &.correct.active {
    background-color: $button-correct;
    box-shadow: 0 1px 0 0 darken($button-correct, 20);
  }
  &.wrong:active, &.wrong.active {
    background-color: $button-wrong;
    box-shadow: 0 1px 0 0 darken($button-wrong, 20);
  }
}
</style>
