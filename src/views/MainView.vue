<template>
  <main class="main">
    <!-- <navigation-bar /> -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
      @enter="enter"
      @leave="leave"
      @after-enter="transitionEnd"
      @after-leave="transitionEnd"
    >
      <router-view class="content" />
    </transition>
  </main>
</template>

<script>
import NavigationBar from "@/components/Navigation";
import { wait } from "@/lib/helpers";

export default {
  name: "main-view",
  components: {
    NavigationBar
  },
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
      wait(380).then(done);
    },
    beforeLeave(el) {
      el.classList.add("active-slide");
    },
    leave(el, done) {
      const { from, to } = this.$store.state.navPositions;
      const slideClass = `${from > to ? "right" : "left"}-slide`;
      el.classList.add(slideClass);
      wait(380).then(done);
    },
    transitionEnd(el) {
      el.classList.remove("active-slide");
    }
  }
};
</script>

<style>
.main {
  display: grid;
  grid-template-columns: 2vw 1fr 2vw;
  width: 100vw;
  min-height: 100vh;
  max-width: 1880px;
  margin: 0 auto;
  position: relative;
}
.active-slide {
  position: absolute;
  left: 50vw;
  width: 96vw;
  max-width: calc(1880px - 4vw);
  transform: translateX(-50%);
  transition: transform 350ms ease-out, opacity 100ms ease-out;
}
.left-slide {
  transform: translateX(-50%) translateX(-100vw);
  opacity: 0.1;
}
.right-slide {
  transform: translateX(-50%) translateX(100vw);
  opacity: 0.1;
}
.content {
  grid-column: 2;
}
.content {
  margin-top: 5rem;
}
@media screen and (min-width: 615px) {
  .main {
    grid-template-columns: 5vw 1fr 5vw;
  }
  .active-slide {
    width: 90vw;
    max-width: calc(1880px - 10vw);
  }
}
@media screen and (min-width: 900px) {
  .main {
    grid-template-columns: 15vw 1fr 15vw;
  }
  .active-slide {
    width: 70vw;
    max-width: calc(1880px - 30vw);
  }
}
</style>
