<template>
  <div class="statusbar">

    <button-small
      class="statusbar__button icon--search"
      @click="$router.push('/search')"
      :value="''"
    />
    <button-small
      class="statusbar__button icon--messages"
      @click="$router.push('/messages')"
      :value="unreadMessages.length"
    />
    <button-small
      class="statusbar__button icon--notifications"
      @click="$router.push('/notifications')"
      :value="unreadNotifications.length"
    />

    <div class="statusbar__account" @click="$router.push('/me')">
      <p class="statusbar__account-name hover-underline">Jonas Kuske</p>
      <user-avatar :image="avatar" :name="'Jonas Kuske'" class="statusbar__account-image" />
    </div>
    <button @click.prevent="logoutHelper" class="statusbar__logout">Logout</button>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import avatar from "@/assets/images/jonas.jpg";
import UserAvatar from "@/components/UserAvatar";
import ButtonSmall from "@/components/ButtonSmall";

export default {
  name: "StatusBar",
  components: {
    UserAvatar,
    ButtonSmall
  },
  data: () => ({ avatar }),
  computed: {
    ...mapGetters("messageStore", ["unreadMessages"]),
    ...mapGetters("notificationStore", ["unreadNotifications"])
  },
  methods: {
    ...mapActions(["logout"]),
    logoutHelper() {
      this.logout().then(() => this.$router.push("/login"));
    }
  }
};
</script>

<style>
.statusbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.statusbar__button {
  width: 2rem;
}
.icon--search {
  background-image: url(~@/assets/icons/search.png);
  margin-right: 0.5rem;
}
.icon--notifications {
  background-image: url(~@/assets/icons/bell.svg);
  background-size: 58%;
}
.icon--messages {
  background-image: url(~@/assets/icons/msg.svg);
}
.statusbar__account {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.statusbar__account-name {
  display: none;
  box-sizing: border-box;
  margin: 0 1rem 0 0;
}
.statusbar__account-image {
  width: 2.2rem;
  cursor: pointer;
}
.statusbar__logout {
  background: none;
  border: none;
  padding: 0 0 2px 0;
  cursor: pointer;
  box-sizing: border-box;
}
.statusbar__logout:hover,
.statusbar__logout:focus {
  border-bottom: 2px solid red;
  padding-bottom: 0;
}
@media screen and (min-width: 1200px) {
  .statusbar__account-name {
    display: block;
  }
}
</style>
