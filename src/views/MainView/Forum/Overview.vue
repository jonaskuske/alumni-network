<template>
<main class="forum">
  <title-bar label="Forum" title="Übersicht - Letzte Beiträge">
    <button class="button-main" @click="$router.push('/forum/new')">Beitrag erstellen</button>
  </title-bar>
  <section class="forum__links">
    <router-link to="/forum/sub" class="button-secondary">Zu den Unterforen</router-link>
    <router-link to="/me#posts" class="button-secondary">Beiträge verwalten</router-link>
  </section>
  <section class="forum__posts">
    <div class="thumbnail-grid forum__post-thumbnails">
      <post-thumbnail v-for="post in posts" :key="post.id" :post="post"/>
    </div>
    <div class="forum__post-filters">
      <h2>Forenbeiträge filtern</h2>
      <label for="forum__post-search">Suche</label>
      <input type="text" id="forum__post-search" placeholder="Post suchen...">
      <button type="button">Filter löschen</button>
    </div>
  </section>
</main>
</template>

<script>
import { mapGetters } from "vuex";
import TitleBar from "@/components/TitleBar";
import PostThumbnail from "@/components/PostThumbnail";

export default {
  name: "Forum",
  components: { PostThumbnail, TitleBar },
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
  box-sizing: border-box;
  padding: 2rem 0 4rem 0;
}
.forum__links > a {
  margin-right: 1rem;
}
.forum__posts {
  display: flex;
  width: 100%;
}
.forum__post-thumbnails {
  flex: 7;
}
.forum__post-filters {
  flex: 3;
}
</style>
