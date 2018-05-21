<template>
  <with-hero-image
    @click="$refs.imageInput.click()"
    :clickable="true"
    :image="image || placeholderImage"
    :fullsize="!!image"
  >
    <main class="create-post">
    <button
        type="button"
        v-if="image"
        @click="image = ''"
        class="create-post__remove-image"
      >
        Bild entfernen
      </button>
      <form action="post" @submit.prevent="save">
        <title-bar label="Forum" title="Beitrag bearbeiten">
          <button class="button-main" type="submit">Speichern</button>
        </title-bar>
        <button @click="$router.push('/forum')" type="button" class="button-secondary">Zurück (Abbrechen)</button>
        <post-form v-model="form" />
      </form>
      <input type="file" @change="readImage" accept="image/*" class="hide" ref="imageInput">
    </main>
  </with-hero-image>
</template>

<script>
import { readImageFromInput } from "@/lib/helpers";
import placeholderImage from "@/assets/images/hero-placeholder.svg";
import { mapState, mapGetters, mapActions } from "vuex";
import { REPLACE_POST } from "@/store/modules/forum/types";
import PostForm from "./PostForm";
import WithHeroImage from "@/components/WithHeroImage";
import TitleBar from "@/components/TitleBar";

export default {
  name: "EditPost",
  components: {
    WithHeroImage,
    TitleBar,
    PostForm
  },
  props: ["id"],
  created() {
    if (this.postsById[this.id]) this.getPost();
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        gallery: [],
        usergroup: "Eine der Optionen auswählen..."
      },
      image: "",
      data: {},
      placeholderImage
    };
  },
  computed: {
    ...mapState("userStore", ["name", "username"]),
    ...mapGetters("forumStore", ["postsById"])
  },
  watch: {
    postsById(posts) {
      if (posts[this.id]) this.getPost();
    }
  },
  methods: {
    ...mapActions("forumStore", { replacePost: REPLACE_POST }),
    save() {
      const newPost = { ...this.form, ...this.data, image: this.image };
      this.replacePost(newPost);
      this.$router.push(`/forum/post/${newPost.id}`);
    },
    getPost() {
      const post = this.postsById[this.id];
      if (this.username !== post.username) {
        return this.$router.push(`/forum/post/${post.id}`);
      }

      const { title, content, gallery, usergroup, image, ...data } = post;
      this.form = { title, content, gallery, usergroup };
      this.image = image;
      this.data = data;
    },
    async readImage(evt) {
      const image = await readImageFromInput(evt);
      this.image = image;
    }
  }
};
</script>