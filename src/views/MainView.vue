<template>
  <div class="pagecontainer">
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
      @enter="enter"
      @leave="leave"
      @after-enter="transitionEnd"
      @after-leave="transitionEnd"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import { wait } from "@/lib/helpers";

export default {
  name: "MainView",
  methods: {
    beforeEnter(el) {
      const { from, to } = this.$store.state.navPositions;
      const slideClass = `${to > from ? "right" : "left"}-slide`;
      el.classList.add(slideClass, "active-slide");
    },
    enter(el, done) {
      wait(30).then(() => {
        el.classList.remove("left-slide", "right-slide");
      });
      wait(350).then(done);
    },
    beforeLeave(el) {
      el.classList.add("active-slide");
    },
    leave(el, done) {
      const { from, to } = this.$store.state.navPositions;
      const slideClass = `${from > to ? "right" : "left"}-slide`;
      el.classList.add(slideClass);
      wait(350).then(done);
    },
    transitionEnd(el) {
      el.classList.remove("active-slide");
    }
  }
};
</script>

<style>
.pagecontainer {
  display: flex;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  width: 90%;
  margin: 0 auto;
}
@media screen and (min-width: 900px) {
  .pagecontainer {
    width: 80%;
  }
}
@media screen and (min-width: 1620px) {
  .pagecontainer {
    width: 70%;
  }
}
@media screen and (min-width: 1880px) {
  .pagecontainer {
    width: 60%;
  }
}
.active-slide {
  position: absolute;
  width: 100%;
  transition: transform 350ms ease-out, opacity 300ms ease-out;
}
.left-slide {
  transform: translateX(-100vw);
  opacity: 0.5;
}
.right-slide {
  transform: translateX(100vw);
  opacity: 0.5;
}
</style>
