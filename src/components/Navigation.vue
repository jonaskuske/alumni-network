<template>
  <header class="navigation__header" :class="{'navigation__header--expanded': mobileLayout && menuOpen}">
    <div>
      <router-link to="/" :event="mobileLayout ? 'none' : 'click'">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        class="homeicon"
        :class="{'homeicon--hamburger': showHamburger}"
        @click="toggleMenuIfMobile"
        viewBox="0 0 841.89 595.28"
        >
          <g class="homeicon__lines">
            <rect class="homeicon__color" x="314.82" y="215.64" width="39.6" :height="showHamburger ? '280' : '168.29'"/>
            <rect class="homeicon__color" x="401.94" y="215.64" width="39.6" :height="showHamburger ? '280' : '168.29'"/>
            <rect class="homeicon__color" x="489.06" y="215.64" width="39.6"   :height="showHamburger ? '280' : '168.29'"/>
          </g>
          <path class="homeicon__color homeicon__letter homeicon__letter--d" d="M227.71,81V235.13c-15.37-13.28-35.34-23.24-57.24-23.24a87.7,  87.7,0,0,0,0,175.39c21.9,0,42.08-10.08,57.45-23.36l-.21,20h39.6V81ZM170.47,351.55a52,52,0,1,1,0-103.93c34.32,0,  55.82,23.27,55.82,52S204.54,351.55,170.47,351.55Z"/>
          <path class="homeicon__color homeicon__letter homeicon__letter--p" d="M615.77,  514.27V364.39c15.37,13.27,35.35,23.23,57.25,23.23,48.43,0,86.09-39.26,86.09-87.69S721.45,212.24,673,  212.24c-21.9,0-42.08,10.08-57.45,23.35l.2-20H576.18V514.27ZM673,248c28.7,0,50.62,20.27,50.62,52,0,28.7-21.92,  52-50.62,52-32.72,0-56-23.26-56-52S638.64,248,673,248Z"/>
        </svg>
      </router-link>
      <nav class="header__nav" v-if="!mobileLayout">
        <ul class="header__list">
          <li v-for="{ text, link } in pages" :key="link" class="header__listitem">
            <router-link :to="link">
              <p class="header__listitemtext">{{ text }}</p>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="header__icon-container">
        <div class="header__iconwrapper header__iconwrapper--search">
          <router-link to="/search" class="button button__search" />
        </div>
        <div class="header__iconwrapper header__iconwrapper--msg">
          <router-link
            to="/messages"
            class="button button--with-attr button__messages"
            :data-messagecount="unreadMessages.length"
          />
        </div>
        <div class="header__iconwrapper">
          <router-link
            to="/notifications"
            class="button button--with-attr button__notifications"
            :data-notificationcount="unreadNotifications.length"
          />
        </div>
        <router-link to="/me">
          <div class="userstate">
            <p class="userstate__name header__listitemtext">Jonas Kuske</p>
            <profile-picture :width="'2.2rem'" :image="profilePic" class="userstate__image" />
          </div>
        </router-link>
        <a @click.prevent="logoutHelper" class="button__logout">Logout</a>
      </div>
    </div>
    <nav class="header__nav" v-if="mobileLayout && menuOpen">
      <ul class="header__list">
        <li class="header__listitem">
          <router-link to="/" @click.native="toggleMenu">
            <p class="header__listitemtext">Home</p>
          </router-link>
        </li>
        <li v-for="{ text, link } in pages" :key="link" class="header__listitem">
          <router-link :to="link" @click.native="toggleMenu">
            <p class="header__listitemtext">{{ text }}</p>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import Jonas from "@/assets/jonas.jpg";
import ProfilePicture from "@/components/ProfilePicture";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    ProfilePicture
  },
  data() {
    return {
      pages: [
        {
          text: "Forum",
          link: "forum"
        },
        {
          text: "Veranstaltungen",
          link: "veranstaltungen"
        },
        {
          text: "Kontakte",
          link: "kontakte"
        },
        {
          text: "Jobs",
          link: "jobs"
        }
      ],
      profilePic: Jonas
    };
  },
  computed: {
    ...mapState(["mobileLayout", "menuOpen"]),
    ...mapGetters("messageStore", ["unreadMessages"]),
    ...mapGetters("notificationStore", ["unreadNotifications"]),
    showHamburger() {
      return this.mobileLayout && !this.menuOpen;
    }
  },
  methods: {
    ...mapActions(["toggleMenu", "logout"]),
    navigate(pos, url) {
      this.$router.push(url);
    },
    toggleMenuIfMobile() {
      this.mobileLayout && this.toggleMenu();
    },
    logoutHelper() {
      this.logout();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.navigation__header,
.navigation__nav,
.navigation__list,
.navigation__listitem,
a {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.navigation__header {
  position: fixed;
  background: white;
  width: 100vw;
  left: calc(-50vw + 50%);
  height: 5rem;
  box-sizing: border-box;
  display: flex;
  z-index: 10;
  box-shadow: 0 1px 13px 1px rgba(0, 0, 0, 0.5);
  flex-wrap: wrap;
}
.navigation__header--expanded {
  height: 8rem;
}
.navigation__header > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navigation__header > div,
.navigation__header > nav {
  margin: 0 auto;
  width: 96%;
  max-width: calc(1880px - 4vw);
}
.homeicon {
  width: 4rem;
  flex-basis: 4rem;
  flex-shrink: 1;
  transition: width 220ms 100ms ease-out;
  transform: translateY(4px);
}
.homeicon--hamburger {
  width: 5rem;
}
.homeicon__color {
  fill: #282828;
  transition: fill 200ms ease-in-out;
}
.header__nav {
  margin-right: auto;
  margin-left: 0.7rem;
}
.header__list {
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  grid-gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.header__listitem a {
  text-decoration: none;
}
.header__listitemtext {
  position: relative;
  direction: rtl;
  color: #2c3e50;
  font-size: 1rem;
  padding: 0;
  margin: 0;
}
.header__listitemtext::before {
  content: "";
  position: absolute;
  width: 0;
  height: 100%;
  padding-bottom: 2px;
  border-bottom: 2px solid #b0b0b0;
  transition: width 300ms ease-out, border 200ms ease-in-out;
}
.header__listitemtext:hover {
  direction: ltr;
}
.header__listitemtext:hover::before {
  width: 100%;
}
.header__listitem > a:active > .header__listitemtext::before {
  color: #4040e9;
  width: 100%;
}
.router-link-exact-active > .header__listitemtext::before {
  border-bottom-color: #4040e9;
  width: 100%;
}
.homeicon:hover .homeicon__color {
  fill: #b0b0b0;
}
.router-link-exact-active .homeicon__color {
  fill: #4040e9;
}
.userstate {
  display: flex;
  align-items: center;
}
.userstate__name {
  box-sizing: border-box;
  margin-right: 1rem;
}
.homeicon__lines {
  transition: transform 150ms ease-out;
  transform-origin: center;
}
.homeicon__letter {
  transition: opacity 250ms 100ms ease-out, transform 350ms 100ms ease-out;
}
.homeicon--hamburger .homeicon__letter {
  transition: opacity 250ms ease-out, transform 300ms 80ms ease-out;
}
.homeicon--hamburger .homeicon__lines {
  transform: rotate(90deg);
}
.homeicon--hamburger .homeicon__letter {
  opacity: 0;
}
.homeicon__lines rect {
  transition: height 120ms 100ms ease-out;
}
.homeicon--hamburger .homeicon__lines rect {
  transition: height 120ms ease-in;
  height: 280px;
}
.homeicon--hamburger .homeicon__letter--d {
  transform: translateY(-120px);
}
.homeicon--hamburger .homeicon__letter--p {
  transform: translateY(120px);
}
.header__icon-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-basis: 40%;
}
.header__icon-container > a {
  margin-left: 1rem;
  display: flex;
  align-items: center;
  height: 100%;
}
.header__icon-container > a:first-child {
  margin-left: 0;
}
.button__logout {
  cursor: pointer;
  padding-bottom: 2px;
  box-sizing: border-box;
}
.button__logout:hover {
  border-bottom: 2px solid red;
  padding-bottom: 0;
}
.button {
  background: url() center / 70% no-repeat;
  border-radius: 50%;
  width: 100%;
  padding-bottom: 100%;
}
.button__search {
  background-image: url(~@/assets/icons/search.png);
}
.button__notifications {
  background-image: url(~@/assets/icons/bell.svg);
}
.button__messages {
  background-image: url(~@/assets/icons/msg.svg);
}
.button--with-attr {
  position: relative;
  box-sizing: border-box;
}
.button--with-attr::after {
  right: 0;
  top: 45%;
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 600;
  transform: translateY(-50%) translateX(95%);
  position: absolute;
}
.button__messages::after {
  content: attr(data-messagecount);
}
.button__notifications::after {
  content: attr(data-notificationcount);
}
.button:hover {
  background-color: #9c9c9c;
}
.header__iconwrapper {
  width: 1.7rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
}
.header__iconwrapper--search {
  width: 1.9rem;
}
.header__iconwrapper--msg {
  width: 2rem;
}
.header__iconwrapper + a {
  margin-left: 0.5rem;
}
@media screen and (max-width: 370px) {
  .header__listitemtext {
    font-size: 0.85rem;
  }
  .header__list {
    grid-gap: 8px;
  }
}
@media screen and (max-width: 450px) {
  .header__nav {
    margin: 0 auto;
  }
  .header__iconwrapper {
    margin-right: 0.6rem;
  }
  .header__iconwrapper--search {
    margin-right: 0.1rem;
  }
  .header__list {
    justify-content: center;
  }
}
@media screen and (min-width: 615px) {
  .navigation__header > div,
  .navigation__header > nav {
    max-width: calc(1880px - 10vw);
    width: 90%;
  }
}
@media screen and (min-width: 900px) {
  .navigation__header > div {
    max-width: calc(1880px - 30vw);
    width: 70%;
  }
}
@media screen and (max-width: 1200px) {
  .userstate__name {
    display: none;
  }
}
</style>
