<template>
  <section class="post-display">
    <div class="thumbnail-grid forum__post-thumbnails">
      <post-thumbnail v-for="post in filteredPosts" :key="post.id" :post="post"/>
    </div>
    <div class="forum__post-filters">
      <h2 class="post-display__filter-title">Forenbeiträge filtern</h2>
      <labelled-input v-model="query" label="Post suchen..." class="post-display__search" />
      <button type="button" class="button-secondary post-display__reset" @click="query = ''">
        Filter löschen
      </button>
    </div>
  </section>
</template>

<script>
import LabelledInput from "@/components/LabelledInput";
import PostThumbnail from "@/components/PostThumbnail";

export default {
  name: "PostDisplay",
  components: { PostThumbnail, LabelledInput },
  props: {
    posts: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      query: ""
    };
  },
  computed: {
    filteredPosts() {
      return !this.query
        ? this.posts
        : this.posts.filter(post => {
            for (const val of Object.values(post)) {
              if (
                typeof val === "string" &&
                val.toLowerCase().includes(this.query.toLowerCase())
              )
                return true;
            }
          });
    }
  }
};
</script>

<style>
.post-display {
  display: flex;
  flex-wrap: wrap-reverse;
  margin-left: -3rem;
}
.forum__post-thumbnails {
  flex-basis: 60%;
  flex-grow: 1;
  margin-left: 3rem;
  flex-shrink: 3;
}
.forum__post-filters {
  flex-basis: 15%;
  margin-left: 3rem;
  flex-shrink: 0;
  flex-grow: 2;
}
.post-display__filter-title {
  white-space: nowrap;
  margin-top: 0rem;
  margin-bottom: 1.5rem;
}
.post-display__search {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}
.post-display__reset {
  margin-bottom: 2rem;
}
</style>
