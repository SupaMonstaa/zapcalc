<template>
  <div>
    <SwitchInput @change="onSwitchChange" :switchData="switchData" :initValue="initValue">
      <template v-slot:label0>
        <IconBase iconName="niveau1" iconColor="#FFFFFF"><Barbell1/></IconBase>
      </template>
      <template v-slot:label1>
        <IconBase iconName="niveau2" iconColor="#FFFFFF"><Barbell2/></IconBase>
      </template>
      <template v-slot:label2>
        <IconBase iconName="niveau3" iconColor="#FFFFFF"><Barbell3/></IconBase>
      </template>
    </SwitchInput>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SwitchInput from '@/components/SwitchInput';
import IconBase from '@/components/Icons/IconBase.vue';
import Barbell1 from '@/components/Icons/Barbell1.vue';
import Barbell2 from '@/components/Icons/Barbell2.vue';
import Barbell3 from '@/components/Icons/Barbell3.vue';

@Component({
  components: {
    SwitchInput,
    IconBase,
    Barbell1,
    Barbell2,
    Barbell3,
  },
})
export default class LevelSelect extends Vue {
  @Prop()
  public initValue!: string;

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
    console.log('onSwitchChange', v);
    this.$emit('change', this.level);
  }
}
</script>
