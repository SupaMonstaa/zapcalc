<template>
  <div>
    <SwitchInput @change="onChange" :switchData="switchData" :initValue="initValue"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SwitchInput from '@/components/SwitchInput'
import OperationKind from '@/types/OperationKind'
@Options({
  components: {
    SwitchInput
  },
  props: {
    initValue!: String
  },
  data () {
    return {
      switchData: [
        {
          label: '+',
          value: 'addition'
        },
        {
          label: '-',
          value: 'substraction'
        },
        {
          label: '×',
          value: 'multiplication'
        },
        {
          label: '÷',
          value: 'division'
        },
        {
          label: '+ - × ÷',
          value: 'mix'
        }
      ]
    }
  }
})
export default class OperationSelect extends Vue {
  public initValue!: string;

  private operationKind!: OperationKind;

  onChange (v: string): void {
    this.operationKind = v as OperationKind
    this.$emit('change', this.operationKind)
  }
}
</script>

<style lang="scss" scoped>
  /* change style of inner elements */
  /deep/ .label span {
    display: block;
    margin-top: 1px;
    font-size: 160%;
    font-weight: bold;
  }
  /deep/ .label:last-of-type span {
    display: block;
    text-align: center;
    font-size: 85%;
    width: 28px;
    padding: 1% 16% 0;
  }
</style>
