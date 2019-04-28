<template>
  <div class="events">
    <calendar-view v-if="calendar" />
    <list-view v-else :events="events" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ListView from './ListView';
import CalendarView from './CalendarView';

export default {
  name: 'Events',
  components: { ListView, CalendarView },
  computed: {
    ...mapGetters('eventStore', { events: 'eventsSortedByOldest' }),
    calendar() {
      return this.$route.query.view === 'calendar';
    },
  },
};
</script>

<style>
.events {
  width: 100%;
}
</style>
