<template>
  <div id="app">
    <ZapCalcPage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ZapCalcPage from './views/ZapCalcPage';

@Component({
  components: {
    ZapCalcPage,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 1vh 1vh 2vh 1vh;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
}
@font-face {
  font-family: "VT323";
  src: url('/fonts/VCR_OSD_MONO_1.001.ttf');
  /* src: url('/fonts/VT323-Regular.ttf'); */
}
</style>
