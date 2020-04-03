<template>
  <button :class="correct ? 'correct' : 'wrong'" @click="onClick">{{ value }}</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class KeyboardKey extends Vue {
  @Prop({ required: true })
  public value!: number;

  @Prop({ required: true })
  public correct!: boolean;

  created() {
    console.log(this.correct);
  }

  onClick(evt: Event) {
    if (this.correct) {
      console.log('correct !');
    }
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

$button-color: rgb(48, 138, 241);
$button-correct: rgb(102, 187, 69);
$button-wrong: rgb(230, 71, 71);
button {
  width:100%;
  height:100%;
  border:none;
  padding: 0;
  color:#ffffff;
  font-weight: bold;
  background-color:$button-color;
  box-sizing: border-box;
  border-radius:0.8vh;
  box-shadow: 0 4px 0 0 darken($button-color, 20);
  font-size: 2.2vh;
  -webkit-transition: 100ms linear;
  -ms-transition: 100ms linear;
  transition: 100ms linear;

  &.even {
    background-color:lighten($button-color, 15);
  }

  &:hover {
    background-color: lighten($button-color, 10);
  }

  &:active, &.active {
    background-color: $button-correct;
    box-shadow: 0 1px 0 0 darken($button-correct, 20);
    transform: translateY(3px);
  }

  &.wrong:active, &.wrong.active {
    background-color: $button-wrong;
    box-shadow: 0 1px 0 0 darken($button-wrong, 20);
  }

  &:focus {
    outline:0;
  }
}
</style>
