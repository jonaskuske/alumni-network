<template>
    <div class="splashscreen__main">
      <header class="splashscreen__header">
        <router-link to="/" aria-label="Link to Homepage" class="homelink">
      <svg xmlns="http://www.w3.org/2000/svg" alt="DMP Logo" class="splashscreen__logo" viewBox="0 0 841.89 595.28"><path class="splashscreen__logo--color" d="M354.43,383.93h-39.6V215.64h39.6V383.93Z"/><rect class="splashscreen__logo--color" x="401.94" y="215.64" width="39.6" height="168.29"/><rect class="splashscreen__logo--color" x="489.06" y="215.78" width="39.6" height="168.29"/><path class="splashscreen__logo--color" d="M227.71,81V235.13c-15.37-13.28-35.34-23.24-57.24-23.24a87.7,87.7,0,0,0,0,175.39c21.9,0,42.08-10.08,57.45-23.36l-.21,20h39.6V81ZM170.47,351.55a52,52,0,1,1,0-103.93c34.32,0,55.82,23.27,55.82,52S204.54,351.55,170.47,351.55Z"/><path class="splashscreen__logo--color" d="M615.77,514.27V364.39c15.37,13.27,35.35,23.23,57.25,23.23,48.43,0,86.09-39.26,86.09-87.69S721.45,212.24,673,212.24c-21.9,0-42.08,10.08-57.45,23.35l.2-20H576.18V514.27ZM673,248c28.7,0,50.62,20.27,50.62,52,0,28.7-21.92,52-50.62,52-32.72,0-56-23.26-56-52S638.64,248,673,248Z"/></svg>

        </router-link>
      </header>
      <transition mode="out-in" name="fade">
        <router-view />
      </transition>
      <the-footer class="footer--on-splash" />
    </div>
</template>

<script>
import TheFooter from "@/components/TheFooter";

export default {
  components: {
    TheFooter
  }
};
</script>


<style>
.homelink {
  display: flex;
  padding-top: 0.5rem;
}
.splashscreen__header {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 3rem;
}
.splashscreen__logo {
  width: 6rem;
}
.splashscreen__logo--color {
  fill: #f0f0f0;
}
.splashscreen__main {
  position: relative;
  min-height: 100vh;
  height: 100%;
  color: #f0f0f0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.splashscreen__main::before {
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
    url("~@/assets/bg-splash.jpg") center / cover no-repeat;
  filter: blur(4px) brightness(90%);
}
.footer--on-splash {
  background: none;
  color: rgba(240, 240, 240, 0.7);
  padding: 0 1rem;
  max-width: 2000px;
  font-size: 0.9rem;
}
.footer--on-splash > div {
  max-width: 100%;
  width: 100%;
}
.footer--on-splash a {
  color: rgba(240, 240, 240, 0.7);
}
@media screen and (min-width: 600px) {
  .footer--on-splash {
    padding: 0 4rem;
  }
}
@media screen and (min-width: 900px) {
  .splashscreen__header {
    height: 5rem;
  }
  .footer--on-splash {
    padding: 0 8vw;
  }
}
@media screen and (min-width: 1100px) {
  .footer--on-splash {
    font-size: 1rem;
    margin: 0 auto;
  }
}
@media screen and (min-width: 1500px) {
  .footer--on-splash {
    padding: 0 15vw;
  }
}
</style>
