<template>
  <main>
    <title-bar title="Nächste Termine" label="Events">
      <button class="button-main" @click="$router.push('/events/new')">Event erstellen</button>
    </title-bar>
    <section class="forum__links">
      <router-link :to="{path: '/events', query: {view: 'calendar'}}" class="button-secondary">Kalenderansicht</router-link>
      <router-link to="/me#events" class="button-secondary">Events verwalten</router-link>
    </section>
    <events-display :events="events" />
  </main>
</template>

<script>
  import TitleBar from "@/components/TitleBar";
  import EventsDisplay from "@/components/EventsDisplay";

  export default {
    name: "EventsList",
    components: { TitleBar, EventsDisplay },
    props: {
      events: {
        type: Array,
        required: false,
        default: () => []
      }
    }
  };
</script>
