<template>
  <with-hero-image
    :clickable="true"
    :image="image || placeholderImage"
    :fullsize="!!image"
    @click="$refs.imageInput.click()"
  >
    <main class="create-post">
      <button
        v-if="image"
        type="button"
        class="create-post__remove-image"
        @click="image = ''"
      >
        Bild entfernen
      </button>
      <form method="post" @submit.prevent="save">
        <title-bar label="Forum" title="Beitrag bearbeiten">
          <button
            class="button-main button--danger"
            type="button"
            @click="deleteAndLeave"
          >
            Löschen
          </button>
          <button class="button-main" type="submit">Speichern</button>
        </title-bar>
        <button
          type="button"
          class="button-secondary"
          @click="$router.push('/forum')"
        >
          Zurück (Abbrechen)
        </button>
        <post-form v-model="form" />
      </form>
      <input
        ref="imageInput"
        type="file"
        accept="image/*"
        class="hide"
        @change="readImage"
      />
    </main>
  </with-hero-image>
</template>

<script>
import { readImageFromInput } from '@/lib/helpers';
import placeholderImage from '@/assets/images/hero-placeholder.svg';
import { mapGetters, mapActions } from 'vuex';
import { REPLACE_POST, DELETE_POST } from '@/store/modules/forum/types';
import PostForm from '@/components/PostForm';
import WithHeroImage from '@/components/WithHeroImage';
import TitleBar from '@/components/TitleBar';

export default {
  name: 'EditPost',
  components: {
    WithHeroImage,
    TitleBar,
    PostForm,
  },
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        gallery: [],
        usergroup: 'Eine der Optionen auswählen...',
      },
      image: '',
      data: {},
      post: {},
      placeholderImage,
    };
  },
  computed: {
    ...mapGetters('userStore', ['currentUser']),
    ...mapGetters('forumStore', ['postsById']),
  },
  watch: {
    postsById(posts) {
      if (posts[this.id]) this.getPost();
    },
  },
  created() {
    if (this.postsById[this.id]) this.getPost();
  },
  methods: {
    ...mapActions('forumStore', {
      replacePost: REPLACE_POST,
      deletePost: DELETE_POST,
    }),
    save() {
      const newPost = { ...this.form, ...this.data, image: this.image };
      this.replacePost(newPost);
      this.$router.push(`/forum/post/${newPost.id}`);
    },
    deleteAndLeave() {
      this.deletePost(this.post);
      this.$router.push('/forum');
    },
    getPost() {
      const post = this.postsById[this.id];
      if (this.currentUser.username !== post.username) {
        return this.$router.push(`/forum/post/${post.id}`);
      }

      const { title, content, gallery, usergroup, image, ...data } = post;
      this.post = post;
      this.form = { title, content, gallery, usergroup };
      this.image = image;
      this.data = data;
    },
    async readImage(evt) {
      const image = await readImageFromInput(evt);
      this.image = image;
    },
  },
};
</script>
