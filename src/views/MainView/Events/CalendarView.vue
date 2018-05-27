<template>
  <main>
    <title-bar title="Kalender" label="Events">
      <button class="button-main" @click="$router.push('/events/new')">Event erstellen</button>
    </title-bar>
    <section class="forum__links">
      <router-link to="/events" class="button-secondary">Listenansicht</router-link>
      <router-link to="/me#events" class="button-secondary">Events verwalten</router-link>
    </section>
  </main>
</template>

<script>
  import TitleBar from "@/components/TitleBar";

  export default {
    name: "CalendarView",
    components: { TitleBar },
    data: () => ({ date: new Date() }),
    computed: {
      days() {
        return this.date.getMonth();
      }
    }
  };
</script>
