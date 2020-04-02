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
  .calc-screen {
    box-sizing: border-box;
    background: #DDD;
    border-radius: 0.3%;
    line-height:20vh;
    font-size:16vh;
  }
</style>
