<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__item" v-for="{ name, href } in links" :key="href">
        <router-link :to="href" @click.native="closeMenu" class="navigation__link hover-underline" :class="{'navigation__link--exact-only': href === '/'}">
          {{ name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { TOGGLE_MENU_STATE } from "@/store/types";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    links: {
      type: Array,
      required: true,
      default: () => [{ name: "No links", href: "#" }]
    }
  },
  computed: {
    ...mapState(["mobileLayout"])
  },
  methods: {
    ...mapActions({ toggleMenu: TOGGLE_MENU_STATE }),
    closeMenu() {
      this.mobileLayout && this.toggleMenu();
    }
  }
};
</script>


<style>
.navigation {
  margin-right: auto;
  margin-left: 0.7rem;
}
.navigation__list {
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  list-style: none;
}
.navigation__link {
  text-decoration: none;
  color: #2c3e50;
  margin-right: 12px;
}
.navigation__item:last-child > .navigation__link {
  margin-right: 0;
}
.navigation__link.router-link-exact-active::before,
.navigation__link.router-link-active:not(.navigation__link--exact-only)::before {
  border-bottom-color: #4040e9;
  transform: scaleX(1);
}
</style>
