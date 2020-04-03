<template>
  <div class="switch-container">
    <div class="switch">
      <template v-for="(input, index) in switchData">
        <input :name="id" :key="id + '-input-' + index" :id="id + '-' + index" type="radio"
        @change="onChange" v-model="value" :value="input.value"/>
        <label :key="id + '-label-' + index" :for="id + '-' + index" class="switch__label">
          <slot v-if="!input.label" :name="'label' + index"></slot>
          <span v-html="input.label"></span>
        </label>
      </template>
      <div ref="indicator" class="switch__indicator"><div class="switch__cursor"></div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SwitchInput extends Vue {
  @Prop({ type: String })
  public initValue!: string;

  @Prop()
  // eslint-disable-next-line
  private switchData!: any;

  private value!: string;

  private id!: string;

  private static componentId = 0;

  created() {
    this.value = `${this.initValue}`;
    // increment id to create unique component Id
    SwitchInput.componentId += 1;
    this.id = `switch-input-${SwitchInput.componentId}`;
  }

  mounted() {
    // adjust cursor width to the number of inputs
    const indicator = this.$refs.indicator as HTMLElement;
    indicator.style.width = `${Math.floor(1000 / this.switchData.length) / 10}%`;
    let i: number;
    console.log(this.initValue, this.switchData);
    for (i = 0; i < this.switchData.length; i += 1) {
      if (this.initValue === this.switchData[i].value) {
        break;
      }
    }
    this.moveIndicator(i);
  }

  onChange(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    const inputIndex = parseInt(input.id.replace(`${this.id}-`, ''), 0);
    this.moveIndicator(inputIndex);
  }

  /**
   * move the indicator to the label of the given input
   */
  moveIndicator(inputIndex: number): void {
    const indicator = this.$refs.indicator as HTMLElement;
    indicator.style.transform = `translate3d(${inputIndex}00%,0,0)`;
    this.$emit('change', this.value);
  }
}
</script>

<style lang="scss" scoped>
$switch-bg: rgb(167, 166, 166);
.switch-container {
  padding: 1vh;
  height:100%;
  box-sizing:border-box;
  border-radius: 30px;
  background: $switch-bg;
  overflow:hidden;
  box-shadow: 0px -3px 0 0 darken($switch-bg, 30);
}
.switch {
  display: flex;
  position:relative;
  align-items: center;
  width: 100%;
  height:100%;
  padding: 0;

  &__label {
    width: 100%;
    box-sizing: border-box;
    padding: 0 2px;
    text-align: center;
    cursor: pointer;
    transition: color 200ms ease-out;
    line-height:1;
    color: #ffffff;
    & svg {
      max-width: 70px;
    }
  }
  &__indicator {
    width: 33.33%;
    height: 180%;
    position: absolute;
    z-index:10;
    left: 0;
    top: -40%;
    &:after {
      height:100%;
      box-sizing:border-box;
      border-left: 2vh solid transparent;
      border-right: 2vh solid transparent;
      border-top: 2vh solid orange;
      border-bottom: 2vh solid orange;
      position: absolute;
      left: calc(50% - 2vh);
      content:' ';
    }
    transition: transform 600ms cubic-bezier(.02,.94,.09,.97),
                background 300ms cubic-bezier(.17,.67,.14,1.03);
    transform: translate3d(0,0,0);
  }
  input[type="radio"] {
    &:not(:checked),
    &:checked {
      display: none;
    }
  }
}
</style>
