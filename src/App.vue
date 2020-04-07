<template>
  <div id="app">
    <ZapCalcPage/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ZapCalcPage from './views/ZapCalcPage';
import './App.scss';

@Component({
  components: {
    ZapCalcPage,
  },
})
export default class App extends Vue {}
</script>
