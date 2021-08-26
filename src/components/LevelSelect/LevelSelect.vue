<template>
  <div class="sel">
    <SwitchInput v-on:change="onSwitchChange"
    :switchData="switchData" :initValue="initValue.toString()">
      <template v-slot:label0>
        <img src="@/assets/images/star.png"/>
      </template>
      <template v-slot:label1>
        <img src="@/assets/images/star.png"/>
        <img src="@/assets/images/star.png"/>
      </template>
      <template v-slot:label2>
        <img src="@/assets/images/star.png"/>
        <img src="@/assets/images/star.png"/>
        <img src="@/assets/images/star.png"/>
      </template>
    </SwitchInput>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SwitchInput from '@/components/SwitchInput'

@Options({
  components: {
    SwitchInput
  },
  props: {
    initValue!: Number
  },
  emits: ['change']
})
export default class LevelSelect extends Vue {
  public initValue!: number;

  private level = 1;

  private switchData = [
    {
      label: '',
      value: '1'
    },
    {
      label: '',
      value: '2'
    },
    {
      label: '',
      value: '3'
    }
  ]

  onSwitchChange (v: string): void {
    this.level = parseInt(v, 0)
    this.$emit('change', this.level)
  }
}
</script>

<style lang="scss" scoped>
  /deep/ img {
    margin-top: 8px;
    width: 25%;
    display:inline-block;
  }
</style>
