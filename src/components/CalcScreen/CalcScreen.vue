<template>
  <div class="calc-screen">
    {{ operation }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class CalcScreen extends Vue {
  @Prop({ type: String, required: true })
  private operation!: string;
}
</script>

<style scoped lang="scss">
  $screen-bg: #ccc;
  .calc-screen {
    margin: 1vh 2vh 2vh;
    background: $screen-bg;
    border-radius: 1vh;
    padding-top: 1vh;
    box-sizing:border-box;
    word-spacing: -4vh;
    line-height:14vh;
    font-size:14vh;
    font-family: "VT323", Helvetica, Arial, sans-serif;
    box-shadow: 1px 3px 1px 1px darken($screen-bg, 30) inset;
    text-shadow: 1px 4px 3px darken($screen-bg, 30);
  }
</style>
