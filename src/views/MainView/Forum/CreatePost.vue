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
      <form method="post" @submit.prevent="publish">
        <title-bar label="Forum" title="Beitrag verfassen">
          <button class="button-main" type="submit">Veröffentlichen</button>
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
import { generateId, readImageFromInput } from '@/lib/helpers';
import placeholderImage from '@/assets/images/hero-placeholder.svg';
import { mapActions, mapGetters } from 'vuex';
import { ADD_POST } from '@/store/modules/forum/types';
import PostForm from '@/components/PostForm';
import WithHeroImage from '@/components/WithHeroImage';
import TitleBar from '@/components/TitleBar';

export default {
  name: 'CreatePost',
  components: {
    WithHeroImage,
    TitleBar,
    PostForm,
  },
  props: {
    tag: {
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
        subforum: '',
        usergroup: '',
      },
      image: '',
      placeholderImage,
    };
  },
  computed: {
    ...mapGetters('userStore', ['currentUser']),
    ...mapGetters('forumStore', ['getSubforumByTag']),
  },
  created() {
    const subforum = this.getSubforumByTag(this.tag);
    if (subforum.name) this.form.subforum = subforum.name;
  },
  methods: {
    ...mapActions('forumStore', { addPost: ADD_POST }),
    publish() {
      if (!this.form.title) return;
      const post = this.createPost();
      this.addPost(post);
      this.$router.push(`/forum/post/${post.id}`);
    },
    createPost() {
      const { title, content, gallery, subforum, usergroup } = this.form;
      const post = {
        title,
        content,
        gallery,
        subforum,
        usergroup,
        date: new Date(),
        image: this.image,
        author: this.currentUser.name,
        username: this.currentUser.username,
        read: true,
        id: generateId(),
        comments: [],
      };
      return post;
    },
    async readImage(evt) {
      this.image = await readImageFromInput(evt);
      this.$refs.imageInput.value = '';
    },
  },
};
</script>

<style>
.create-post {
  position: relative;
}
.create-post__remove-image {
  position: absolute;
  right: 0;
  top: -4rem;
  height: 2rem;
  color: #fff;
  border: none;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  padding: 6px 14px 8px 14px;
  font-weight: 300;
  cursor: pointer;
}
.create-post__remove-image::before {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 10%;
  width: 80%;
  height: 100%;
  border-bottom: 1px solid white;
}
.create-post__remove-image:hover {
  background: rgba(0, 0, 0, 0.4);
}
</style>
