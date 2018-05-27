<template>
  <section class="events-display">
    <div class="thumbnail-grid events-display__thumbnails">
      <event-thumbnail v-for="event in filteredEvents" :key="event.id" :event="event"/>
    </div>
    <div class="forum__post-filters">
      <h2 class="post-display__filter-title">Events filtern</h2>
      <labelled-input v-model="query" label="Event suchen..." class="post-display__search" />
      <button type="button" class="button-secondary post-display__reset" @click="query = ''">
        Filter löschen
      </button>
    </div>
  </section>
</template>

<script>
  import LabelledInput from "@/components/LabelledInput";
  import EventThumbnail from "@/components/EventThumbnail";

  export default {
    name: "EventsDisplay",
    components: { EventThumbnail, LabelledInput },
    props: {
      events: {
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
      filteredEvents() {
        return !this.query
          ? this.events
          : this.events.filter(event => {
              for (const val of Object.values(event)) {
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
  .events-display {
    display: flex;
    flex-wrap: wrap-reverse;
    margin-left: -3rem;
  }
  .events-display__thumbnails {
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
