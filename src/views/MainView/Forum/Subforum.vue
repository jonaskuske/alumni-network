<template>
  <main class="subforum">
    <title-bar :title="subforum.name" label="Forum">
      <button class="button-main" @click="$router.push(`${subforum.tag}/create`)">Beitrag erstellen</button>
    </title-bar>
    <button type="button" @click="$router.push('/forum/subforums')" class="button-secondary subforum__back-button">
      Zurück zu den Unterforen
    </button>
    <post-display :posts="posts" v-if="posts.length" />
    <p v-else>Noch keine Beiträge.</p>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import TitleBar from "@/components/TitleBar";
import PostDisplay from "@/components/PostDisplay";

export default {
  name: "Subforum",
  components: { TitleBar, PostDisplay },
  props: ["tag"],
  computed: {
    ...mapGetters("forumStore", ["postsBySubforumTag", "getSubforumByTag"]),
    subforum() {
      return this.getSubforumByTag(this.tag);
    },
    posts() {
      return this.postsBySubforumTag[this.tag] || [];
    }
  }
};
</script>

<style>
.subforum {
  width: 100%;
}
.subforum__back-button {
  margin-bottom: 1.5rem;
}
</style>
