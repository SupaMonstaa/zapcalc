<template>
  <div class="level-select">
    <div class="switch">
      <input name="switch" id="one" type="radio"
        @change="onChange" v-model="value" value="1"/>
      <label for="one" class="switch__label">
        <IconBase iconName="niveau1" iconColor="#FFFFFF"><Barbell1/></IconBase>
      </label>
      <input name="switch" id="two" type="radio"
        @change="onChange" v-model="value" value="2"/>
      <label for="two" class="switch__label">
        <IconBase iconName="niveau2" iconColor="#FFFFFF"><Barbell2/></IconBase>
      </label>
      <input name="switch" id="three" type="radio"
        @change="onChange" v-model="value" value="3"/>
      <label for="three" class="switch__label">
        <IconBase iconName="niveau3" iconColor="#FFFFFF"><Barbell3/></IconBase>
      </label>
      <div class="switch__indicator"><div class="switch__cursor"></div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import IconBase from '@/components/Icons/IconBase.vue';
import Barbell1 from '@/components/Icons/Barbell1.vue';
import Barbell2 from '@/components/Icons/Barbell2.vue';
import Barbell3 from '@/components/Icons/Barbell3.vue';

@Component({
  components: {
    IconBase,
    Barbell1,
    Barbell2,
    Barbell3,
  },
})
export default class LevelSelect extends Vue {
  @Prop({ type: Number })
  public initValue!: number;

  private value = '0';

  private level = parseInt(this.value, 0);

  created() {
    this.value = `${this.initValue}`;
  }

  onChange() {
    this.level = parseInt(this.value, 0);
    console.log('onChange', this.value);
    this.$emit('change', this.level);
  }
}
</script>

<style lang="scss" scoped>
.level-select {
  padding: 1vh;
  height:100%;
  box-sizing:border-box;
  border-radius: 30px;
  background: #444;
  overflow:hidden;
  box-shadow: 0px 2px 1px 1px #000 inset;
}
.switch {
  display: flex;
  position:relative;
  align-items: center;
  width: 100%;
  height:100%;
  padding: 0;

  &__label {
    line-height:1;
    width: 33.33%;
    padding: 0 2px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    transition: color 200ms ease-out;

    & svg {
      max-width: 70px;
    }
  }
  &__indicator {
    width: 33.33%;
    height: 140%;
    position: absolute;
    left: 0;
    top: -20%;
    &:after {
      height:100%;
      box-sizing:border-box;
      border-left: 16px solid transparent;
      border-right: 16px solid transparent;
      border-top: 16px solid orange;
      border-bottom: 16px solid orange;
      position: absolute;
      left: calc(50% - 16px);
      content:' ';
    }
    transition: transform 600ms cubic-bezier(.02,.94,.09,.97),
                background 300ms cubic-bezier(.17,.67,.14,1.03);
    transform: translate3d(0,0,0);
  }

  input#one:checked ~ .switch__indicator {
    transform: translate3d(0,0,0);
  }
  input#two:checked ~ .switch__indicator {
    transform: translate3d(100%,0,0);
  }
  input#three:checked ~ .switch__indicator {
    transform: translate3d(200%,0,0);
  }
  input[type="radio"] {
    &:not(:checked),
    &:checked {
      display: none;
    }
  }
}
</style>
