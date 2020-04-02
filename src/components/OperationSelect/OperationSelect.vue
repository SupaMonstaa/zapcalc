<template>
  <div>
    <div class="button-wrap">
      <input @change="onChange"
        v-model="value"
        value="substraction"
        class="hidden radio-label"
        type="radio"
        name="op"
        id="yes-button"
        checked="checked">
      <label class="button-label" for="yes-button">
        <span>+</span>
      </label>
      <input @change="onChange"
        v-model="value"
        value="addition"
        class="hidden radio-label"
        type="radio"
        name="op"
        id="no-button">
      <label class="button-label" for="no-button">
        <span>-</span>
      </label>
      <input @change="onChange"
        v-model="value"
        value="multiplication"
        class="hidden radio-label"
        type="radio"
        name="op"
        id="maybe-button">
      <label class="button-label" for="maybe-button">
        <span>x</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import OperationKind from '../../types/OperationKind';
@Component
export default class OperationSelect extends Vue {
  @Prop()
  public initValue!: string;

  private value = '0';

  private operationKind!: OperationKind;

  created() {
    this.value = `${this.initValue}`;
  }

  onChange() {
    this.operationKind = this.value as OperationKind;
    console.log('onChange', this.value);
    this.$emit('change', this.operationKind);
  }
}
</script>

<style lang="scss" scoped>

$dark: #292929;
$light: #efefef;
$red: #D91E18;
$green: #2ECC71;
$blue: #4183D7;
$font-stack: "Lato", sans-serif;

* {
  box-sizing: border-box;
}

.button-wrap {
  position: relative;
  text-align: center;
  top: 50%;
}

.button-label {
  display: inline-block;
  padding: 10%;
  margin: 1%;
  cursor: pointer;
  color: $dark;
  border-radius: 0.25em;
  background: $light;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2), inset 0 -3px 0 rgba(0,0,0,0.22);
  transition: 0.3s;
  user-select: none;
  span {
    font-size: 1vw;
    font-family: $font-stack;
  }
  &:hover {
    background: darken($light, 10%);
    color: darken($dark, 10%);
    box-shadow: 0 3px 10px rgba(0,0,0,0.2), inset 0 -3px 0 rgba(0,0,0,0.32);
  }
  &:active {
    transform: translateY(2px);
    box-shadow: 0 3px 10px rgba(0,0,0,0.2), inset 0px -1px 0 rgba(0,0,0,0.22);
  }
}

#yes-button:checked + .button-label {
  background: $green;
  color: $light;
  &:hover {
    background: darken($green, 5%);
    color: darken($light, 5%);
  }
}

#no-button:checked + .button-label {
  background: $red;
  color: $light;
  &:hover {
    background: darken($red, 5%);
    color: darken($light, 5%);
  }
}

#maybe-button:checked + .button-label {
  background: $blue;
  color: $light;
  &:hover {
    background: darken($blue, 5%);
    color: darken($light, 5%);
  }
}

.hidden {
  display: none;
}
</style>
