<template>
  <with-hero-image :image="event.image" :transition="true">
    <p class="title-label">Event</p>
    <h1 class="title">{{ event.title || 'Event existiert nicht' }}</h1>
  </with-hero-image>
</template>

<script>
import { mapGetters } from "vuex";
import WithHeroImage from "@/components/WithHeroImage";

export default {
  name: "Event",
  components: { WithHeroImage },
  props: ["id"],
  computed: {
    ...mapGetters("eventStore", ["eventsById"]),
    event() {
      return this.eventsById[this.id] || {};
    }
  }
};
</script>
