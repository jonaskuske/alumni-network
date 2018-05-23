<template>
  <with-hero-image :image="event.image" :transition="true">
    <main>
      <title-bar label="Event" :title="event.title || 'Event nicht gefunden'">
        <template v-if="byUser">
          <button class="button-main button--danger post__delete">Löschen</button>
          <button class="button-main" @click="$router.push(`/events/event/${post.id}/edit`)">Bearbeiten</button>
        </template>
      </title-bar>
    <p v-html="content" />
    </main>
  </with-hero-image>
</template>

<script>
  import { mapGetters } from "vuex";
  import WithHeroImage from "@/components/WithHeroImage";
  import TitleBar from "@/components/TitleBar";

  export default {
    name: "Event",
    components: { WithHeroImage, TitleBar },
    props: ["id"],
    computed: {
      ...mapGetters("eventStore", ["eventsById"]),
      ...mapGetters("userStore", ["currentUser"]),
      event() {
        return this.eventsById[this.id] || {};
      },
      content() {
        const content = this.event.content;
        return content ? this.$sanitize(content.replace(/\n/g, "<br>")) : "";
      },
      byUser() {
        return this.event.username === this.currentUser.username;
      }
    }
  };
</script>
