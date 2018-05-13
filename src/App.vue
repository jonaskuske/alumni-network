<template>
  <div id="root">
    <navigation-header class="navbar" v-if="!onLandingPage" />
    <transition mode="out-in" name="fade">
      <router-view />
    </transition>
    <the-footer v-if="!onLandingPage" />
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter";
import NavigationHeader from "@/components/Navigation";

export default {
  components: {
    TheFooter,
    NavigationHeader
  },
  data() {
    return {
      onLandingPage: true
    };
  },
  watch: {
    $route({ path }) {
      this.onLandingPage = path.includes("login");
    }
  }
};
</script>


<style>
html,
body {
  margin: 0;
  padding: 0;
  color: #2c3e50;
  overflow-x: hidden;
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
label,
input,
button {
  transition: font-size 300ms ease-out;
}
#root,
button,
input {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#root {
  min-height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0.2;
}
p {
  font-size: 0.9rem;
}
@media screen and (min-width: 900px) {
  p {
    font-size: 1rem;
  }
}
</style>
