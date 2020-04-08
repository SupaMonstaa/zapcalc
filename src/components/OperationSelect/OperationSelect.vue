<template>
  <div>
    <SwitchInput @change="onChange" :switchData="switchData" :initValue="initValue"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SwitchInput from '@/components/SwitchInput';
import OperationKind from '@/types/OperationKind';
@Component({
  components: {
    SwitchInput,
  },
})
export default class OperationSelect extends Vue {
  @Prop()
  public initValue!: string;

  private operationKind!: OperationKind;

  private switchData = [
    {
      label: '+',
      value: 'addition',
    },
    {
      label: '-',
      value: 'substraction',
    },
    {
      label: '×',
      value: 'multiplication',
    },
    {
      label: '+ -<br/>× ÷',
      value: 'mix',
    },
  ];

  onChange(v: string): void {
    this.operationKind = v as OperationKind;
    this.$emit('change', this.operationKind);
  }
}
</script>

<style lang="scss" scoped>
  /* change style of inner elements */
  /deep/ .label span {
    font-size:220%;
  }
  /deep/ .label:last-of-type span {
    font-size:120%;
    line-height: 0.8;
  }
</style>
