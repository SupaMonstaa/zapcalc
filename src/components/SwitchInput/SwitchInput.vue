<template>
  <div class="switch">
    <input ref="input" @change="onChange" v-model="cursorIndex" type="range" :id="id" :name="id"
         min="0" :max="switchData.length - 1" />
    <div class="labels">
      <div v-for="(input, index) in switchData"
        :key="id + '-label-' + index" :for="id + '-' + index" class="label">
        <slot v-if="!input.label" :name="'label' + index"></slot>
        <span v-html="input.label"></span>
      </div>
    </div>
    <!-- <div ref="indicator" class="switch__indicator"></div> -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    initValue: String,
    switchData: Object
  },
  emits: ['change']
})
export default class SwitchInput extends Vue {
  public initValue!: string;

  // eslint-disable-next-line
  private switchData!: any;

  private value!: string;

  private id!: string;

  private static componentId = 0;

  private cursorIndex!: number;

  created (): void {
    // this.value = `${this.initValue}`
    // increment id to create unique component Id
    SwitchInput.componentId += 1
    this.id = `switch-input-${SwitchInput.componentId}`
    // adjust cursor width to the number of inputs
    this.cursorIndex = 0
    for (let i = 0; i < this.switchData.length; i += 1) {
      if (this.initValue === this.switchData[i].value) {
        this.cursorIndex = i
      }
    }
  }

  mounted (): void {
    const input = this.$refs.input as HTMLElement
    const percent = 100 - 100 / this.switchData.length
    input.style.width = `calc(${percent}% + 4vh)`
    this.moveIndicator(this.cursorIndex)
  }

  onChange (): void {
    /* const input = evt.target as HTMLInputElement;
    const inputIndex = parseInt(input.id.replace(`${this.id}-`, ''), 0); */
    this.moveIndicator(this.cursorIndex)
  }

  /**
   * move the indicator to the label of the given input
   */
  moveIndicator (cursorIndex: number): void {
    this.cursorIndex = cursorIndex
    this.$emit('change', this.switchData[cursorIndex].value)
  }
}
</script>

<style lang="scss" scoped>
$switch-bg: rgb(61, 55, 47);
$cursor-color: orange;

@mixin thumb {
  height:4.5vh;
  width: 2vh;
  margin:-2.25vh 0 0 0;
  border-radius: 2px;
  background-color: $cursor-color;
  box-sizing:border-box;
  border-top: 1vh solid lighten($cursor-color, 30);
  border-left: 1vh solid lighten($cursor-color, 10);
  border-bottom: 1vh solid darken($cursor-color, 10);
  border-right: 1vh solid $cursor-color;
  box-shadow: 0 1vh 0 0 #444444;
  cursor: pointer;
}

@mixin track {
  content: ' ';
  width: 100%;
  height: 3px;
  padding: 2px 0;
  box-sizing:border-box;
  border: 8px solid $switch-bg;
  border-radius: 10px;
  background-color: darken($switch-bg, 50);
  cursor: pointer;
  animation: 0.2s;
}

@mixin input-type-range {
  padding: 4% 0 1% 0;
  margin: 0;
  -webkit-appearance: none;
  width: 100%;
  background: transparent;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    @include track;
  }

  &::-webkit-slider-thumb {
    @include thumb;
    -webkit-appearance: none;
  }

  &::-moz-range-track {
    @include track;
  }

  &::-moz-range-thumb {
    @include thumb;
  }

  &::-ms-track {
    @include track;
    /*color: transparent;
    border-width: $thumb-width 0;
    border-color: transparent;
    background: transparent;*/
  }

  &::-ms-thumb {
    @include thumb;
  }
/*
  &:focus::-ms-fill-lower {
    background: $track-color;
  }

  &:focus::-ms-fill-upper {
    background: $track-color;
  }*/
}

.switch {
  position:relative;
  width: 100%;
  height:100%;
  padding: 0;
  .labels {
    display: flex;
    resize: horizontal;
    align-items: center;
    .label {
      display: auto;
      z-index:1;
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      line-height:1;
      color: #ffffff;
    }
  }

  input[type=range] {
    @include input-type-range;
  }
}
/*
input[type="range"] {
  position:relative;
  z-index:10;
  //-webkit-appearance: none;
  width: 100%;
  //background: transparent;
  &:focus {
    outline: none;
  }
}*/

</style>
