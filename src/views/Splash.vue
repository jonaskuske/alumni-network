<template>
    <div class="splashscreen">
      <splashscreen-header />
      <transition mode="out-in" name="fade">
        <router-view class="splashscreen__main" />
      </transition>
      <splashscreen-footer class="splashscreen__footer" />
    </div>
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


<style scoped>
h1,
h2,
p,
ul,
li,
span {
  margin-top: 0;
}
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
.splashscreen__main {
  flex-grow: 1;
  box-sizing: border-box;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 0;
}
@media screen and (min-width: 900px) {
  .splashscreen__main {
    width: 80%;
  }
}
@media screen and (min-width: 1620px) {
  .splashscreen__main {
    width: 70%;
  }
}
@media screen and (min-width: 1880px) {
  .splashscreen__main {
    width: 60%;
  }
}
.splashscreen__footer {
  background: none;
  color: rgba(240, 240, 240, 0.7);
}
</style>
