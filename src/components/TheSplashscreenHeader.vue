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
import DmpLogo from "@/components/DmpLogo";

export default {
  components: {
    DmpLogo
  }
};
</script>


<style scoped>
.splashscreenheader {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 3rem;
}
.splashscreenheader__link {
  display: flex;
  padding-top: 0.5rem;
}
.splashscreenheader__logo {
  width: 6rem;
  fill: #f0f0f0;
}
@media screen and (min-width: 900px) {
  .splashscreenheader {
    height: 5rem;
  }
}
</style>
