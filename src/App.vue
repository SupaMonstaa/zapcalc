<template>
    <ZapCalcPage/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ZapCalcPage from './components/ZapCalcPage'
import './App.scss'

@Options({
  components: {
    ZapCalcPage
  }
})
export default class App extends Vue {}
</script>
