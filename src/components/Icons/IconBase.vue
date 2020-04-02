<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewbox"
    :aria-labelledby="iconName"
    role="presentation">
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box',
    },
    viewbox: {
      type: String,
      default: '0 0 280 150',
    },
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },
};
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>
