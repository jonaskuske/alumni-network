<template>
  <router-link :to="`/forum/subforums/${subforum.tag}`" class="subforum-thumbnail">
    <h2 class="subforum-thumbnail__title">{{ subforum.name }}</h2>
    <p class="subforum-thumbnail__count">Beiträge: {{ posts.length }}</p>
    <template v-for="i in 3">
      <div
        :key="i"
        :style="{backgroundImage: `url(${posts[i-1] && posts[i-1].image ? posts[i-1].image : randomFallback()})`}"
        class="subforum-thumbnail__image"
      />
    </template>
  </router-link>
</template>

<script>
import fallback1 from '@/assets/images/thumb-fallback1.jpg'
import fallback2 from '@/assets/images/thumb-fallback2.jpg'
import fallback3 from '@/assets/images/thumb-fallback3.jpg'
import fallback4 from '@/assets/images/thumb-fallback4.jpg'
const fallbacks = [fallback1, fallback2, fallback3, fallback4]

import { mapGetters } from 'vuex'

export default {
  name: 'SubforumThumbnail',
  props: {
    subforum: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters('forumStore', ['postsBySubforumName']),
    posts() {
      return this.postsBySubforumName[this.subforum.name] || []
    },
  },
  methods: {
    randomFallback: () => fallbacks[Math.floor(Math.random() * Math.floor(4))],
  },
}
</script>

<style>
.subforum-thumbnail {
  position: relative;
  color: inherit;
  width: 100%;
  display: block;
  text-decoration: none;
  display: flex;
  width: 100%;
  height: 15rem;
}
.subforum-thumbnail::before {
  content: '';
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
.subforum-thumbnail:hover::before {
  opacity: 1;
}
.subforum-thumbnail__title {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40%;
  margin: 0;
  box-sizing: border-box;
  padding: 0 0 1.5rem 1rem;
  background: rgba(240, 240, 240, 0.85);
  width: 100%;
  display: flex;
  align-items: center;
}
.subforum-thumbnail__count {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0 0 1rem 1rem;
  font-weight: 500;
  font-size: 1rem;
}
.subforum-thumbnail__image {
  width: 100%;
  background: #f0f0f0 center / cover no-repeat;
  object-fit: cover;
  flex-basis: 30%;
  flex-grow: 1;
}
</style>
