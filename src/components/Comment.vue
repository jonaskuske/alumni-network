<template>
  <li class="comment">
    <header class="comment__header">
      <div class="comment__user">
        <user-avatar :image="author.profilePicture" class="comment__avatar" />
        <p class="comment__name">{{ author.name }}</p>
      </div>
      <div class="comment__buttons">
        <button-small
          v-if="currentUser.username === comment.username"
          class="comment__delete"
          @click="$emit('delete')"
        />
      </div>
    </header>
    <p class="comment__text">{{ comment.content }}</p>
    <div v-if="comment.gallery.length" class="comment__gallery">
      <gallery-thumbnail v-for="(image, i) in comment.gallery" :image="image" :key="i" />
    </div>
  </li>
</template>

<script>
import ButtonSmall from "@/components/ButtonSmall";
import UserAvatar from "@/components/UserAvatar";
import GalleryThumbnail from "@/components/GalleryThumbnail";
import { mapGetters } from "vuex";

export default {
  name: "Comment",
  components: { UserAvatar, ButtonSmall, GalleryThumbnail },
  props: {
    comment: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters("userStore", ["usersByUsername", "currentUser"]),
    author() {
      return this.usersByUsername[this.comment.username] || {};
    }
  }
};
</script>

<style>
.comment {
  background: #f0f0f0;
  list-style: none;
  margin-bottom: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}
.comment__header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.comment__user {
  display: flex;
  flex: 7;
  align-items: center;
}
.comment__avatar {
  flex: 3;
  max-width: 3rem;
}
.comment__name {
  flex: 7;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 1.5rem;
}
.comment__buttons {
  flex: 3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.comment__delete {
  max-width: 2.5rem;
  background-image: url(~@/assets/icons/wastebin.svg);
}
.comment__text {
  width: 100%;
}
.comment__gallery {
  width: 100%;
  display: grid;
  grid-template: auto / repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 5px;
}
</style>
