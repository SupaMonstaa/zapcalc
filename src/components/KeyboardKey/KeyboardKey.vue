<template>
  <button v-on:click="onClick">{{ value }}</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class KeyboardKey extends Vue {
  @Prop({ required: true })
  public value!: number;

  onClick() {
    this.$emit('change', this.value);
  }
}
</script>

<style scoped lang="scss">

button {
  width:100%;
  height:100%;
  background-color:#DFF;
  box-sizing: border-box;
  border-radius:3px;
  box-shadow: 0 2px #888;
  font-size: 2.5vh;
  -webkit-transition: background-color 200ms linear;
  -ms-transition: background-color 200ms linear;
  transition: background-color 200ms linear;

  &:hover {
    background-color:#EEE;
  }

  &:active {
    background-color:#EEE;
    /*box-shadow: 0 2px #888;*/
    transform: translateY(1px);
  }

  &:focus {
    outline:0;
  }
}
</style>
