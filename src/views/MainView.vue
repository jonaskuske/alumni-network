<template>
  <div class="pagecontainer" :class="{'transition-within-active': transitionActive}">
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
import { mapState } from "vuex";
import { wait } from "@/lib/helpers";

export default {
  name: "MainView",
  data: () => ({ transitionActive: false }),
  computed: {
    ...mapState(["navigationOrder"]),
    transitionClasses() {
      const { from, to } = this.navigationOrder;
      const left = "transition-left-slide";
      const right = "transition-right-slide";
      return typeof from === "number" && typeof to === "number"
        ? {
            enter: to > from ? right : left,
            leave: from > to ? right : left,
            active: "transition-slide-active"
          }
        : {
            enter: "transition-scale",
            leave: "transition-scale-hide",
            active: "transition-scale-active"
          };
    }
  },
  methods: {
    beforeEnter(el) {
      this.transitionActive = true;
      el.classList.add(
        this.transitionClasses.active,
        this.transitionClasses.enter
      );
    },
    enter(el, done) {
      wait(30).then(() => {
        el.classList.remove(this.transitionClasses.enter);
      });
      wait(300).then(done);
    },
    beforeLeave(el) {
      el.classList.add(this.transitionClasses.active);
    },
    leave(el, done) {
      el.classList.add(this.transitionClasses.leave);
      wait(300).then(done);
    },
    transitionEnd(el) {
      this.transitionActive = false;
      el.classList.remove(this.transitionClasses.active);
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
  padding-top: 4rem;
}
.pagecontainer::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  z-index: -1;
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
/* prevents pagecontainer from overflowing when child is positioned absolutely */
.transition-within-active {
  height: 1000vh;
}
.transition-slide-active {
  position: absolute;
  width: 100%;
  transition: transform 300ms ease-out, opacity 300ms ease-out;
}
.transition-left-slide {
  transform: translateX(-100vw);
  opacity: 0.5;
}
.transition-right-slide {
  transform: translateX(100vw);
  opacity: 0.5;
}
.transition-scale-active {
  position: absolute;
  width: 100%;
  transition: transform 250ms ease-out;
}
.transition-scale {
  transform: scale(0.96);
}
.transition-scale-hide {
  opacity: 0;
}
</style>
