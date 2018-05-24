<template>
<main class="forum">
  <title-bar label="Forum" title="Übersicht - Letzte Beiträge">
    <button class="button-main" @click="$router.push('/forum/new')">Beitrag erstellen</button>
  </title-bar>
  <section class="forum__links">
    <router-link to="/forum/subforums" class="button-secondary">Zu den Unterforen</router-link>
    <router-link to="/me#posts" class="button-secondary">Beiträge verwalten</router-link>
  </section>
  <post-display :posts="posts" v-if="posts.length" />
  <p v-else>Noch keine Beiträge</p>
</main>
</template>

<script>
import { mapGetters } from "vuex";
import TitleBar from "@/components/TitleBar";
import PostDisplay from "@/components/PostDisplay";

export default {
  name: "Forum",
  components: { TitleBar, PostDisplay },
  computed: {
    ...mapGetters("forumStore", { posts: "postsSortedByNewest" })
  }
};
</script>

<style>
.forum {
  width: 100%;
}
.forum__links {
  display: flex;
  margin: 0 0 1.5rem 0;
}
.forum__links > a {
  margin-right: 1rem;
}
</style>
