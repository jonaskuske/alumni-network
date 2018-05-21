<template>
  <with-hero-image :image="post.image" :transition="true">
    <main>
      <title-bar label="Forenbeitrag" :title="post.title || 'Beitrag nicht gefunden'">
        <template v-if="byUser">
          <button class="button-main button--danger post__delete" @click="deleteAndLeave">Löschen</button>
          <button class="button-main" @click="$router.push(`/forum/post/${post.id}/edit`)">Bearbeiten</button>
        </template>
      </title-bar>
      <p>{{ post.content }}</p>
      <section v-if="post.gallery.length">
        <p class="title-label">{{ post.gallery.length }} Bilder</p>
        <h2 class="subtitle">Gallerie</h2>
        <div class="post__gallery">
          <img v-for="(image, i) in post.gallery" :src="image" :key="i" class="post__gallery-image" />
        </div>
      </section>
      <section id="comments">
        <p class="title-label">{{ post.comments.length }} Antworten</p>
        <h2 class="subtitle">Kommentare</h2>
      </section>
    </main>
  </with-hero-image>
</template>

<script>
import { DELETE_POST } from "@/store/modules/forum/types";
import { mapGetters, mapActions, mapState } from "vuex";
import TitleBar from "@/components/TitleBar";
import WithHeroImage from "@/components/WithHeroImage";

export default {
  name: "Post",
  components: { WithHeroImage, TitleBar },
  props: ["id"],
  computed: {
    ...mapGetters("forumStore", ["postsById"]),
    ...mapState("userStore", ["username"]),
    post() {
      return this.postsById[this.id] || { comments: [], gallery: [] };
    },
    byUser() {
      return this.post.username === this.username;
    }
  },
  methods: {
    ...mapActions("forumStore", { deletePost: DELETE_POST }),
    deleteAndLeave() {
      this.deletePost(this.post.id);
      this.$router.push("/forum");
    }
  }
};
</script>

<style>
.post__gallery {
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template: auto / repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-flow: dense;
}
.post__gallery-image {
  width: 100%;
}
.post__delete {
  margin-right: 0.8rem;
}
</style>
