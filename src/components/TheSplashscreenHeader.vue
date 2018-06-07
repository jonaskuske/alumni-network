<template>
  <header class="splashscreenheader">
    <router-link
      to="/"
      aria-label="Link to Homepage"
      class="splashscreenheader__link"
    >
      <dmp-logo class="splashscreenheader__logo" />
    </router-link>
  </header>
</template>

<script>
import DmpLogo from '@/components/DmpLogo'

export default {
  components: {
    DmpLogo,
  },
}
</script>


<style scoped>
.splashscreenheader {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 3rem;
  padding: 1rem 0 0 0;
}
.splashscreenheader__link {
  display: flex;
}
.splashscreenheader__logo {
  width: 100%;
  fill: #f0f0f0;
}
@media screen and (min-width: 900px) {
  .splashscreenheader {
    height: 4rem;
  }
}
</style>
