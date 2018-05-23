<template>
  <header class="header" :class="{'header--expanded': mobileLayout && menuOpen}">
<div class="header__container">
      <!-- Logo -->
      <transition mode="out-in" appear> <!-- Bugfix for Edge! -->
        <dmp-logo
          v-if="mobileLayout"
          role="button"
          @click.native="toggleMenu"
          :showHamburger="showHamburger"
          :class="['header__logo', {'home-path-matched': onHome}]"
        />
        <router-link v-else to="/"><dmp-logo class="header__logo" /></router-link>
      </transition>

      <!-- Navigation links -->
      <transition name="fade--delayed">
        <the-navigation :links="links" class="header__navigation" v-if="!mobileLayout || menuOpen" />
      </transition>

      <!-- Buttons and Login state -->
      <the-status-bar class="header__statusbar" />
      </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DmpLogo from "@/components/DmpLogo";
import TheNavigation from "@/components/TheNavigation";
import TheStatusBar from "@/components/TheStatusBar";

export default {
  components: {
    DmpLogo,
    TheNavigation,
    TheStatusBar
  },
  data() {
    return {
      baseLinks: [
        {
          name: "Forum",
          href: "/forum"
        },
        {
          name: "Events",
          href: "/events"
        },
        {
          name: "Kontakte",
          href: "/kontakte"
        },
        {
          name: "Jobs",
          href: "/jobs"
        }
      ],
      onHome: true
    };
  },
  computed: {
    ...mapState(["mobileLayout", "menuOpen"]),
    links() {
      return this.mobileLayout
        ? [{ name: "Home", href: "/" }, ...this.baseLinks]
        : this.baseLinks;
    },
    showHamburger() {
      return this.mobileLayout && !this.menuOpen;
    }
  },
  watch: {
    $route({ path }) {
      this.onHome = path === "/";
    }
  },
  methods: {
    ...mapActions(["toggleMenu"])
  }
};
</script>

<style>
.header {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 4rem;
  z-index: 10;
  background: white;
  box-shadow: 0 1px 13px 1px rgba(0, 0, 0, 0.5);
  transition: height 150ms 100ms ease-out;
}
.header--expanded {
  height: 6rem;
}
.header__container {
  width: 90%;
  height: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  padding-right: 1.2rem;
}
.header__logo {
  width: 4rem;
  height: 4rem;
  transform: translateY(2px);
  cursor: pointer;
}
.header__logo:hover {
  fill: #b0b0b0;
}
.router-link-exact-active .header__logo,
.home-path-matched.header__logo {
  fill: #4040e9;
}
.header__navigation {
  height: 2rem;
  order: 1;
  flex-basis: 100%;
  display: flex;
}
.header__statusbar {
  flex-basis: 30%;
  height: 4rem;
}
@media screen and (min-width: 900px) {
  .header__container {
    width: 80%;
  }
  .header__navigation {
    order: initial;
    flex-basis: 50%;
    align-items: center;
    height: 100%;
  }
}
@media screen and (min-width: 1620px) {
  .header__container {
    width: 70%;
  }
}
@media screen and (min-width: 1880px) {
  .header__container {
    width: 60%;
  }
}
@media screen and (min-width: 1200px) {
  .header__statusbar {
    flex-basis: 40%;
  }
}
</style>
