<template>
  <div class="sel">
    <SwitchInput @change="onSwitchChange"
    :switchData="switchData" :initValue="initValue.toString()">
      <template v-slot:label0>
        <img src="@/assets/star.png"/>
      </template>
      <template v-slot:label1>
        <img src="@/assets/star.png"/><img src="@/assets/star.png"/>
      </template>
      <template v-slot:label2>
        <img src="@/assets/star.png"/><img src="@/assets/star.png"/><img src="@/assets/star.png"/>
      </template>
    </SwitchInput>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SwitchInput from '@/components/SwitchInput';

@Component({
  components: {
    SwitchInput,
  },
})
export default class LevelSelect extends Vue {
  @Prop({ type: Number })
  public initValue!: number;

  private level = 1;

  private switchData = [
    {
      label: '',
      value: '1',
    },
    {
      label: '',
      value: '2',
    },
    {
      label: '',
      value: '3',
    },
  ]

  onSwitchChange(v: string) {
    this.level = parseInt(v, 0);
    this.$emit('change', this.level);
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
