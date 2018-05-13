<template>
  <img :src="image" :style="`width: ${width}; height: ${width};`" alt="Profile picture of currently logged in user">
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>
