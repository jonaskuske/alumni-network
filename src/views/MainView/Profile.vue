<template>
  <with-hero-image :image="headerImage" :transition="true" :fixed="true">
    <main>
      <title-bar label="Mein Profil" :title="name">
        <button class="button-main">Profil bearbeiten</button>
      </title-bar>
      <user-avatar :image="profilePicture" class="my-profile__avatar" />
      <p class="title-label">Forum</p>
      <h2 class="subtitle" id="posts">Meine Beiträge</h2>
      <div class="thumbnail-grid">
        <post-thumbnail v-for="post in postsByUsername[username]" :key="post.id" :id="post.id" :post="post" />
        <p v-if="!postsByUsername[username] || !postsByUsername[username].length">Keine Beiträge erstellt.</p>
      </div>
      <p class="title-label">Events</p>
      <h2 class="subtitle" id="events">Meine Veranstaltungen</h2>
      <div class="thumbnail-grid">
        <event-thumbnail v-for="event in eventsByUsername[username]" :key="event.id" :id="event.id" :event="event" />
        <p v-if="!eventsByUsername[username] || !eventsByUsername[username].length">Keine Events erstellt.</p>
      </div>
    </main>
  </with-hero-image>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import UserAvatar from "@/components/UserAvatar";
import WithHeroImage from "@/components/WithHeroImage";
import EventThumbnail from "@/components/EventThumbnail";
import PostThumbnail from "@/components/PostThumbnail";
import TitleBar from "@/components/TitleBar";

export default {
  name: "Profile",
  components: {
    WithHeroImage,
    UserAvatar,
    EventThumbnail,
    PostThumbnail,
    TitleBar
  },
  computed: {
    ...mapState("userStore", [
      "name",
      "username",
      "profilePicture",
      "headerImage"
    ]),
    ...mapGetters("eventStore", ["eventsByUsername"]),
    ...mapGetters("forumStore", ["postsByUsername"])
  }
};
</script>

<style>
.my-profile__avatar {
  width: 200px;
}
</style>
