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
      :value="unreadMessages.length || '0'"
    />
    <button-small
      class="statusbar__button icon--notifications"
      @click="$router.push('/notifications')"
      :value="unreadNotifications.length || '0'"
    />

    <router-link to="/me" class="statusbar__account">
      <p class="statusbar__account-name hover-underline">{{ currentUser.name }}</p>
      <user-avatar :image="currentUser.profilePicture" :name="currentUser.name" class="statusbar__account-image" />
    </router-link>
    <button @click.prevent="logout" class="statusbar__logout">Logout</button>

  </div>
</template>

<script>
  import * as auth from "@/lib/auth";
  import { mapState, mapGetters } from "vuex";
  import UserAvatar from "@/components/UserAvatar";
  import ButtonSmall from "@/components/ButtonSmall";

  export default {
    name: "StatusBar",
    components: { UserAvatar, ButtonSmall },
    computed: {
      ...mapState(["mobileLayout"]),
      ...mapGetters("userStore", ["currentUser"]),
      ...mapGetters("messageStore", ["unreadMessages"]),
      ...mapGetters("notificationStore", ["unreadNotifications"])
    },
    methods: {
      logout() {
        auth.logout();
        this.$router.push("/login");
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
  padding-left: 1rem;
  color: inherit;
  text-decoration: none;
}
.statusbar__account-name {
  display: none;
  box-sizing: border-box;
  margin: 0 0.5rem 0 0;
}
.statusbar__account-image {
  width: 2.2rem;
  cursor: pointer;
}
.statusbar__logout {
  position: relative;
  display: none;
  background: none;
  border: none;
  padding: 0;
  color: #2c3e50;
  margin-left: 1.2rem;
  cursor: pointer;
}
.statusbar__logout::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: -4px;
  left: 0;
  opacity: 0;
  border-bottom: 2px solid red;
}
.statusbar__logout:hover::before,
.statusbar__logout:focus::before {
  opacity: 1;
}
@media screen and (min-width: 900px) {
  .statusbar__logout {
    display: block;
  }
}
@media screen and (min-width: 1200px) {
  .statusbar__account-name {
    display: block;
  }
}
</style>
