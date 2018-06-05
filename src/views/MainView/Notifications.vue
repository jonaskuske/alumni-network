<template>
  <main class="notifications">
    <title-bar title="Alle Benachrichtigungen" label="Benachrichtigungen">
      <button type="button" class="button-main" @click="markAllAsRead">Alle als gelesen markieren</button>
    </title-bar>

    <button v-if="onlyUnread" class="button-secondary notifications__toggle" @click="$router.push({path: $route.path, query: {show: 'all'}})">
      Alle anzeigen
    </button>
    <button v-else class="button-secondary notifications__toggle" @click="$router.push($route.path)">
      Nur ungelesene
    </button>

    <div class="notifications__container">
      <router-link v-for="(notif, i) in displayedNotifications" @click.native="markAsRead(notif)" :key="notif.text+notif.link+i" :to="notif.link" class="notifications__link" :class="{'notifications__link--unread': !notif.read}">
        <p class="notifications__text"> {{ notif.text }} </p>
        <div class="notifications__button-container">
          <button-small
            class="icon--readstate"
            :class="{'icon--unreadstate': !notif.read}"
            @click.prevent.stop="toggleReadState(notif)"
          />
        </div>
      </router-link>
    </div>
  </main>
</template>

<script>
import {
  MARK_ALL_AS_READ,
  MARK_AS_READ,
  TOGGLE_READ_STATE
} from "@/store/modules/notifications/types";

import { mapState, mapGetters, mapActions } from "vuex";
import TitleBar from "@/components/TitleBar";
import ButtonSmall from "@/components/ButtonSmall";

export default {
  name: "Notifications",
  components: { TitleBar, ButtonSmall },
  computed: {
    ...mapState("notificationStore", ["notifications"]),
    ...mapGetters("notificationStore", ["unreadNotifications"]),
    onlyUnread() {
      return this.$route.query.show !== "all";
    },
    displayedNotifications() {
      return this.onlyUnread ? this.unreadNotifications : this.notifications;
    }
  },
  methods: {
    ...mapActions("notificationStore", {
      markAllAsRead: MARK_ALL_AS_READ,
      markAsRead: MARK_AS_READ,
      toggleReadState: TOGGLE_READ_STATE
    })
  }
};
</script>

<style>
.notifications {
  width: 100%;
}
.notifications__toggle {
  margin-bottom: 2rem;
}
.notifications__container {
  display: flex;
  flex-wrap: wrap;
}
.notifications__link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0.5rem 0;
  width: 100%;
  background: #f0f0f0;
  text-decoration: none;
  color: currentColor;
  position: relative;
  transition: padding 150ms 120ms ease-out;
}
.notifications__link--unread {
  padding-left: 0.6rem;
  transition: padding 150ms ease-out;
}
.notifications__link--unread::before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  left: 7px;
  height: 0.85rem;
  width: 0.85rem;
  background: radial-gradient(
    rgba(32, 32, 211, 0.712),
    rgba(136, 132, 177, 0.836)
  );
  border-radius: 50%;
  opacity: 0;
  transition: opacity 170ms ease-out;
}
.notifications__link--unread::before {
  opacity: 1;
  transition: opacity 170ms 120ms ease-out;
}
.notifications__text {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  margin: 0;
}
.notifications__button-container {
  width: 100%;
  max-width: 2rem;
  margin-right: 1rem;
}
</style>
