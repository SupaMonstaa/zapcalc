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

  private cursorIndex!: number;

  created() {
    this.value = `${this.initValue}`;
    // increment id to create unique component Id
    SwitchInput.componentId += 1;
    this.id = `switch-input-${SwitchInput.componentId}`;
    // adjust cursor width to the number of inputs
    let i: number;
    for (i = 0; i < this.switchData.length; i += 1) {
      if (this.initValue === this.switchData[i].value) {
        break;
      }
    }
    this.cursorIndex = i;
  }

  mounted() {
    const input = this.$refs.input as HTMLElement;
    const percent = 100 - 100 / this.switchData.length;
    input.style.width = `calc(${percent}% + 4vh)`;
    this.moveIndicator(this.cursorIndex);
  }

  onChange(): void {
    /* const input = evt.target as HTMLInputElement;
    const inputIndex = parseInt(input.id.replace(`${this.id}-`, ''), 0); */
    this.moveIndicator(this.cursorIndex);
  }

  /**
   * move the indicator to the label of the given input
   */
  moveIndicator(cursorIndex: number): void {
    this.cursorIndex = cursorIndex;
    // const indicator = this.$refs.indicator as HTMLElement;
    // const percentX = Math.round(1000 * (cursorIndex / this.switchData.length)) / 10;
    // console.log('percent', percentX);
    // indicator.style.transform = `translate3d(${percentX},0,0)`;
    this.$emit('change', this.switchData[cursorIndex].value);
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
  top: 1vh;
  content: ' ';
  width: 100%;
  height: 1vh;
  padding: 0.25vh 0;
  box-sizing:border-box;
  border: 1vh solid $switch-bg;
  border-radius: 1vh;
  background-color: darken($switch-bg, 50);
  cursor: pointer;
  animation: 0.2s;
}

@mixin input-type-range {
  padding: 1vh 0;
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

  &::-ms-fill-lower {
    /*@include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius * 2;
    background: $track-color;*/
  }

  &::-ms-fill-upper {
    /*@include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius * 2;
    background: $track-color;*/
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
  /*input {
    position:relative;
    top:0;
    padding: 0;
    width:100%;
    margin: 20px 0 0 0;
  }*/
  /*-moz-animation-timing-function: ;&::before {
    position: absolute;
    top: 1vh;
    content: ' ';
    width: 100%;
    padding: 0.25vh 0;
    box-sizing:border-box;
    border: 1vh solid $switch-bg;
    border-radius: 1vh;
    background-color: darken($switch-bg, 50);
  }*/
/*
  &__indicator {
    border-radius: 2px;
    height:4.5vh;
    width: 2vh;
    background-color: $cursor-color;
    box-sizing:border-box;
    border-top: 1vh solid lighten($cursor-color, 30);
    border-left: 1vh solid lighten($cursor-color, 10);
    border-bottom: 1vh solid darken($cursor-color, 10);
    border-right: 1vh solid $cursor-color;
    position: absolute;
    left: -1vh;
    box-shadow: 0 1vh 0 0 #444444;
  }*/
  .labels {
    display: flex;
    resize: horizontal;
    align-items: center;
    .label {
      display: auto;
      position:relative;
      top: 40%;
      z-index:1;
      width: 100%;
      //height: 50%;
      box-sizing: border-box;
      // padding: 50% 0 0 0;
      text-align: center;
      cursor: pointer;
      transition: color 200ms ease-out;
      line-height:1;
      color: #ffffff;
      & svg {
        max-width: 60px;
      }
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
