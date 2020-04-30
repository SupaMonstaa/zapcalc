<template>
  <button @click="startGame" class="start-game" v-bind:style="backgroundImage">
    <span>{{ seconds }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class StartButton extends Vue {
  @Prop({ type: Number })
  private gameTimeLeft!: number;

  @Prop({ type: Number })
  private gameDuration!: number;

  get seconds(): string {
    return this.gameTimeLeft < 0 ? 'Start' : `${this.gameTimeLeft}`;
  }

  get backgroundImage() {
    if (this.gameTimeLeft >= 0) {
      const deg = Math.floor(360 * (this.gameTimeLeft / this.gameDuration));
      const color = '#eb5648';
      if (deg < 180) {
        return {
          backgroundImage: `linear-gradient(${90 - deg}deg,${color} 50%,transparent 50%),linear-gradient(90deg,#fff 50%,${color} 50%)`,
        };
      }
      return {
        backgroundImage: `linear-gradient(${90 - deg}deg,transparent 50%,#fff 50%),linear-gradient(90deg,#fff 50%,${color} 50%)`,
      };
    }
    return {
      backgroundImage: 'none',
      backgroundColor: '#ffffff',
    };
  }

  private startGame(): void {
    this.$emit('click');
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/mixins.scss';

$btn-bg: #ee3322;

button.start-game {
  @include zap-button($btn-bg);
  margin: 0.5vh auto;
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
}
button.start-game {
  border-radius: 50%;
  display: flex;
  float: left;
  span {
    border-radius: 50%;
    display:block;
    line-height:8vh;
    width: 8vh;
    height: 8vh;
    margin: auto;
    background: $btn-bg;
    text-align: center;
  }
}
</style>
