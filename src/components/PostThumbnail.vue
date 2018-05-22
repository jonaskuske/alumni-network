<template>
  <thumbnail
    :title="post.title"
    :subtitle="`Verfasser: ${post.author}`"
    :tag="post.usergroup"
    :image="post.image"
    @click="$router.push(`/forum/post/${post.id}`)"
  >
    <template slot="meta">
      <p :class="['post-thumbnail__date', {'post-thumbnail__date--unread': !post.read}]">
        {{ post.date | date }}
      </p>
    </template>
    <template slot="buttons">
      <button-small
        class="icon--comments"
        :class="{'icon--nocomments': !post.comments.length}"
        :value="post.comments.length || '0'"
        @click.prevent="$router.push(`/forum/post/${post.id}#comments`)"
      />
      <button-small
        v-if="!byUser"
        class="icon--readstate"
        :class="{'icon--unreadstate': !post.read}"
        @click.prevent="toggleReadState({id: post.id})"
      />
      <button-small
        v-else
        class="icon--edit"
        @click.prevent="$router.push(`/forum/post/${post.id}/edit`)"
      />
    </template>
  </thumbnail>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { TOGGLE_READ_STATE } from "@/store/modules/forum/types";
import Thumbnail from "./Thumbnail";
import ButtonSmall from "@/components/ButtonSmall";

export default {
  components: {
    Thumbnail,
    ButtonSmall
  },
  props: {
    post: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters("userStore", ["currentUser"]),
    byUser() {
      return this.post.username === this.currentUser.username;
    }
  },
  methods: {
    ...mapActions("forumStore", { toggleReadState: TOGGLE_READ_STATE })
  }
};
</script>

<style>
.post-thumbnail__date {
  position: relative;
  transition: padding 150ms 120ms ease-out;
}
.post-thumbnail__date--unread {
  padding-left: 0.8rem;
  transition: padding 150ms ease-out;
}
.post-thumbnail__date::before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  left: -5px;
  height: 0.85rem;
  width: 0.85rem;
  background: radial-gradient(
    rgba(32, 32, 211, 0.712),
    rgba(136, 132, 177, 0.836)
  );
  border-radius: 50%;
  opacity: 0;
  transition: opacity 150ms ease-out;
}
.post-thumbnail__date--unread::before {
  opacity: 1;
  transition: opacity 150ms 120ms ease-out;
}
.icon--comments {
  background-image: url(~@/assets/icons/msg.svg);
}
.icon--nocomments {
  background-image: url(~@/assets/icons/msg-bright.svg);
}
.icon--comments::after {
  font-size: 0.8rem;
}
.icon--nocomments::after {
  color: #808080;
}
.icon--nocomments:hover {
  background-color: transparent;
}
.icon--readstate {
  background-image: url(~@/assets/icons/eye-bright.svg);
  background-size: 90%;
}
.icon--unreadstate {
  background-image: url(~@/assets/icons/eye.svg);
}
.icon--edit {
  background-image: url(~@/assets/icons/edit.svg);
}
</style>
