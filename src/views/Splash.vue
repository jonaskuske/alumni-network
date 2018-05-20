<template>
    <main class="splashscreen">
      <splashscreen-header />
      <transition mode="out-in" name="fade">
        <router-view />
      </transition>
      <splashscreen-footer class="splashscreen__footer" />
    </main>
</template>

<script>
import SplashscreenHeader from "@/components/TheSplashscreenHeader";
import SplashscreenFooter from "@/components/TheFooter";

export default {
  components: {
    SplashscreenHeader,
    SplashscreenFooter
  }
};
</script>


<style>
.splashscreen {
  position: relative;
  min-height: 100vh;
  height: 100%;
  color: #f0f0f0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.splashscreen::before {
  content: "";
  position: absolute;
  width: calc(100% + 50px);
  height: calc(100% + 50px);
  top: -25px;
  left: -25px;
  z-index: -1;
  background: linear-gradient(
      to bottom right,
      rgba(157, 174, 251, 0.8),
      rgba(124, 131, 253, 0.93) 60%,
      rgba(113, 113, 216, 0.98) 80%
    ),
    url("~@/assets/images/bg-splash.jpg") center / cover no-repeat;
  filter: blur(4px) brightness(90%);
}
.splashscreen__footer {
  background: none;
  padding: 0 1rem;
  max-width: 2000px;
  font-size: 0.9rem;
  color: rgba(240, 240, 240, 0.7);
}
.splashscreen__footer > div {
  max-width: 100%;
  width: 100%;
}
@media screen and (min-width: 600px) {
  .splashscreen__footer {
    padding: 0 4rem;
  }
}
@media screen and (min-width: 900px) {
  .splashscreen__footer {
    padding: 0 8vw;
  }
}
@media screen and (min-width: 1100px) {
  .splashscreen__footer {
    font-size: 1rem;
    margin: 0 auto;
  }
}
@media screen and (min-width: 1500px) {
  .splashscreen__footer {
    padding: 0 15vw;
  }
}
</style>
