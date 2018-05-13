<template>
  <router-link :to="`/forum?post=${post.index}`" class="post-thumbnail__link">
    <div class="post-thumbnail">
      <img :src="post.image" alt="" class="post-thumbnail__image">
      <p class="post-thumbnail__usergroup">{{ post.usergroup || "Alle" }}</p>
      <div class="post-thumbnail__infobox">
        <p class="post-thumbnail__title">{{ post.title }}</p>
        <p class="post-thumbnail__author">Verfasser: {{ post.author }}</p>
      </div>
      <footer class="post-thumbnail__footer" @click.prevent>
        <div class="post-thumbnail__footer-wrapperdiv">
          <p
            class="post-thumbnail__date"
            :class="{'post-thumbnail__date--unread': !post.read}"
          >
            {{ post.date | date }}
          </p>
        </div>
        <div class="post-thumbnail__footer-wrapperdiv post-thumbnail__icon-container">
          <div class="post-thumbnail__icon-wrapper">
            <button
              class="post-thumbnail__button button__comments"
              :data-messagecount="post.comments.length"
              @click.prevent="$router.push(`/forum?post=${post.index}#comments`)"
            />
          </div>
          <div class="icon__spacer" />
          <div class="post-thumbnail__icon-wrapper">
            <button
              class="post-thumbnail__button button__readstate"
              :class="{'button__readstate--unread': !post.read}"
              @click.prevent="toggleReadState({index: post.index})"
            />
          </div>
        </div>
      </footer>
    </div>
  </router-link>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: () => ({
        title: "7. Alumni Stammtisch",
        image: "https://goo.gl/oNFPR9",
        author: "Joachim Wengel",
        usergroup: "Alumni",
        date: new Date(),
        attending: undefined,
        index: 0
      })
    }
  },
  computed: {
    isAttending() {
      return this.post.attending;
    },
    isNotAttending() {
      return this.post.attending !== undefined && !this.post.attending;
    }
  },
  methods: {
    ...mapActions("forumStore", ["toggleReadState"])
  }
};
</script>

<style scoped>
.post-thumbnail__link {
  color: #2c3e50;
  text-decoration: none;
  position: relative;
}
.post-thumbnail__link::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 0 13px 1px rgba(0, 0, 0, 0.3);
  transition: opacity 180ms ease-out;
  opacity: 0;
  z-index: -1;
}
.post-thumbnail__link:hover::after {
  opacity: 1;
}
.post-thumbnail {
  position: relative;
  width: 100%;
  padding-bottom: 75%;
}
.post-thumbnail::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  background: #f0f0f0;
  z-index: -1;
}
.post-thumbnail__date,
.post-thumbnail__usergroup {
  margin: 0;
  padding: 0;
}
.post-thumbnail__usergroup {
  background: rgba(87, 87, 222, 0.801);
  color: #f0f0f0;
  width: 45%;
  margin-left: 10px;
  text-align: center;
  height: 1.4rem;
}
.post-thumbnail__image {
  top: 0;
  left: 0;
  width: 100%;
  height: 83%;
  position: absolute;
  object-fit: cover;
  z-index: -1;
}
.post-thumbnail__infobox {
  position: absolute;
  bottom: 17%;
  height: 30%;
  width: 100%;
  padding: 10px;
  background: rgba(240, 240, 240, 0.719);
  backdrop-filter: blur(2px);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.post-thumbnail__title,
.post-thumbnail__author {
  width: 100%;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-thumbnail__title {
  font-weight: bold;
  font-size: 1.1rem;
}
.post-thumbnail__author {
  font-size: 0.9rem;
}
.post-thumbnail__footer {
  display: flex;
  justify-content: space-between;
  align-content: center;
  position: absolute;
  height: 17%;
  bottom: 0;
  left: 0;
  width: 100%;
  cursor: default;
}
.post-thumbnail__footer-wrapperdiv {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.post-thumbnail__date {
  position: relative;
  font-size: 0.9rem;
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
    rgba(53, 53, 196, 0.712),
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
.post-thumbnail__icon-container {
  width: 25%;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 0;
}
.post-thumbnail__icon-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
}
.post-thumbnail__button {
  border: none;
  background: url() center / 80% no-repeat;
  width: 100%;
  height: 70%;
  padding: 0;
  padding-bottom: 100%;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
}
.post-thumbnail__button:hover {
  background-color: #9c9c9c;
}
.icon__spacer {
  width: 80%;
}
.button__comments {
  position: relative;
  background-image: url(~@/assets/icons/msg.svg);
}
.button__comments::after {
  content: attr(data-messagecount);
  right: 0;
  top: 40%;
  font-size: 0.9rem;
  color: #282828;
  font-weight: 600;
  transform: translateY(-50%) translateX(100%);
  position: absolute;
}
.button__readstate {
  background-image: url(~@/assets/icons/eye-bright.svg);
  background-size: 90%;
}
.button__readstate--unread {
  background-image: url(~@/assets/icons/eye.svg);
}
</style>
