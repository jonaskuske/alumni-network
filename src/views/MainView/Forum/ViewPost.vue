<template>
  <with-hero-image :image="post.image" :transition="true">
    <main>
      <title-bar label="Forenbeitrag" :title="post.title || 'Beitrag nicht gefunden'">
        <template v-if="byUser">
          <button class="button-main button--danger" @click="deleteAndLeave">Löschen</button>
          <button class="button-main" @click="$router.push(`/forum/post/${post.id}/edit`)">Bearbeiten</button>
        </template>
      </title-bar>
      <section id="content" class="post__content">
        <p class="post__text" v-html="sanitizedContent"></p>
        <div class="post__content-meta">
          <p class="meta-label">Von</p>
          <p class="meta-text">{{ post.author }}</p>
          <p class="meta-label" v-if="post.subforum">Unterforum</p>
          <p class="meta-text">{{ post.subforum }}</p>
          <p class="meta-label">Nutzergruppe:</p>
          <p class="meta-text">{{ post.usergroup }}</p>
          <p class="meta-label">Erstellt am</p>
          <p class="meta-text">{{ post.date | date }}</p>
        </div>
      </section>
      <section v-if="post.gallery.length" id="gallery">
        <p class="title-label">{{ post.gallery.length }} Bilder</p>
        <h2 class="subtitle">Galerie</h2>
        <div class="post__gallery">
          <img v-for="(image, i) in post.gallery" :src="image" :key="i" class="post__gallery-image" />
        </div>
      </section>
      <section id="comments">
        <p class="title-label">{{ post.comments.length }} Antworten</p>
        <h2 class="subtitle">Kommentare</h2>
        <ul class="post__comments">
          <comment v-for="(comment, i) in post.comments" :key="i" :comment="comment" @delete="deleteComment(i)" />
        </ul>
        <form method="post" class="post__new-comment" @submit.prevent="sendComment">
          <label for="create-comment" class="post__new-comment-label">Kommentar hinzufügen</label>
          <textarea
            class="textarea-main post__new-comment-text"
            :class="{'post__new-comment-text--warn': allowWarn && !newComment.content && !newComment.gallery.length}"
            placeholder="Text eingeben..."
            id="create-comment"
            v-model="newComment.content"
          />
          <div class="post__new-comment-gallery">
            <gallery-thumbnail
              class="post__new-comment-thumbnail"
              v-for="(image, i) in newComment.gallery"
              :key="i"
              :image="image"
              @click="newComment.gallery.splice(i, 1)"
              :clickable="true"
            />
          </div>
          <button
            class="button-secondary post__button"
            type="button"
            @click="$refs.gallery.click()"
          >
            Bilder hinzufügen
          </button>
          <button class="button-secondary post__button" type="submit">Absenden</button>
          <input type="file" accept="image/*" multiple class="hide" @change="addImages" ref="gallery">
        </form>
      </section>
    </main>
  </with-hero-image>
</template>

<script>
import {
  DELETE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  MARK_AS_READ
} from "@/store/modules/forum/types";
import { mapGetters, mapActions } from "vuex";
import { readImagesFromInput } from "@/lib/helpers";
import TitleBar from "@/components/TitleBar";
import WithHeroImage from "@/components/WithHeroImage";
import Comment from "@/components/Comment";
import GalleryThumbnail from "@/components/GalleryThumbnail";

export default {
  name: "ViewPost",
  components: { WithHeroImage, TitleBar, Comment, GalleryThumbnail },
  props: ["id"],
  data: () => ({ newComment: { content: "", gallery: [] }, allowWarn: false }),
  computed: {
    ...mapGetters("forumStore", ["postsById"]),
    ...mapGetters("userStore", ["usersByUsername", "currentUser"]),
    post() {
      return this.postsById[this.id] || { comments: [], gallery: [] };
    },
    byUser() {
      return this.post.username === this.currentUser.username;
    },
    sanitizedContent() {
      return (
        this.post.content &&
        this.$sanitize(this.post.content.replace(/\n/g, "<br>"))
      );
    }
  },
  created() {
    typeof this.post.read !== undefined && this.markAsRead(this.post);
  },
  methods: {
    ...mapActions("forumStore", {
      deletePost: DELETE_POST,
      addComment: ADD_COMMENT,
      removeComment: REMOVE_COMMENT,
      markAsRead: MARK_AS_READ
    }),
    deleteAndLeave() {
      this.deletePost(this.post.id);
      this.$router.push("/forum");
    },
    sendComment() {
      if (!this.newComment.content && !this.newComment.gallery.length)
        return (this.allowWarn = true);

      const comment = {
        username: this.currentUser.username,
        ...this.newComment
      };
      this.addComment({ id: this.post.id, comment });
      this.newComment.content = "";
      this.newComment.gallery = [];
    },
    deleteComment(index) {
      this.removeComment({ id: this.post.id, index });
    },
    async addImages(evt) {
      const images = await readImagesFromInput(evt);
      Array.isArray(images) && this.newComment.gallery.push(...images);
    }
  },
  watch: {
    post(post) {
      if (typeof post.read !== undefined) !post.read && this.markAsRead(post);
    }
  }
};
</script>

<style>
.post__content {
  display: flex;
  flex-wrap: wrap;
  margin: -1rem 0 0 -2rem;
}
.post__text {
  flex-basis: 67%;
  flex-grow: 3;
  flex-shrink: 1;
  margin: 0;
  text-align: justify;
  margin: 1rem 0 0 2rem;
}
.post__content-meta {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 3;
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  margin: 1rem 0 0 2rem;
}
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
.post__comments {
  display: block;
  padding: 0 0 2rem 0;
  border-bottom: 2px solid grey;
  max-width: 70rem;
}
.post__new-comment {
  display: block;
  margin-top: 2rem;
}
.post__new-comment-label {
  display: block;
  padding-bottom: 5px;
}
.post__new-comment-text {
  width: 100%;
  height: 200px;
  max-width: 70rem;
}
.post__new-comment-text::placeholder {
  font-size: 0.9rem;
}
.post__new-comment-text--warn {
  border-bottom: 2px solid tomato;
}
.post__new-comment-gallery {
  width: 100%;
  display: grid;
  grid-template: auto / repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 5px;
}
.post__new-comment-thumbnail::after {
  background-image: url(~@/assets/icons/delete.svg);
}
.post__button {
  margin-top: 1rem;
}
.post__button[type="button"] {
  margin-right: 1rem;
}
@media screen and (min-width: 1500px) {
  .post__text {
    column-count: 2;
  }
}
</style>
