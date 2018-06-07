<template>
  <main class="date-view">
    <title-bar :title="`Events am ${$options.filters.date(date.date)}`" label="Events">
      <button class="button-main" @click="$router.push('/events/new')">Event erstellen</button>
    </title-bar>
    <section class="forum__links">
      <router-link :to="{path: '/events', query: {view: 'calendar'}}" class="button-secondary">Zurück</router-link>
    </section>
    <events-display :events="events" />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import TitleBar from '@/components/TitleBar'
import EventsDisplay from '@/components/EventsDisplay'

export default {
  name: 'EventsList',
  components: { TitleBar, EventsDisplay },
  props: {
    datestring: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('eventStore', ['eventsByDate']),
    date() {
      const [year, month, day] = this.datestring.split('-')
      return {
        year,
        month,
        day,
        date: new Date(`${year}-${month.padStart(2, 0)}-${day}`),
      }
    },
    events() {
      const { eventsByDate, date } = this
      const { year, month, day } = date
      if (
        eventsByDate[year] &&
        eventsByDate[year][month] &&
        eventsByDate[year][month][day]
      ) {
        return eventsByDate[year][month][day]
      } else return []
    },
  },
}
</script>

<style>
.date-view {
  width: 100%;
}
</style>
