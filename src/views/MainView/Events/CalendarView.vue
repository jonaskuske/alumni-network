<template>
  <main>
    <title-bar title="Kalender" label="Events">
      <button class="button-main" @click="$router.push('/events/new')">Event erstellen</button>
    </title-bar>
    <section class="forum__links">
      <router-link to="/events" class="button-secondary">Listenansicht</router-link>
      <router-link to="/me#events" class="button-secondary">Events verwalten</router-link>
    </section>
    <div style="display:flex; align-items: center;">
      <h3>{{ date.toLocaleString("de-DE", {month: "long", year: "numeric"}) }}</h3>
      <button class="prev-month" @click="previousMonth">&lt;</button>
      <button class="next-month" @click="nextMonth">&gt;</button>
    </div>
    <div class="dates-container">
      <date-thumbnail
        v-for="i in days"
        :key="i"
        :day="i"
        :events="eventsOfMonth[i]"
        @click="$router.push(`/events/date/${year}-${month}-${i}`)" />
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import TitleBar from '@/components/TitleBar'
import DateThumbnail from '@/components/DateThumbnail'
export default {
  name: 'CalendarView',
  components: { TitleBar, DateThumbnail },
  data: () => ({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  }),
  computed: {
    ...mapGetters('eventStore', ['eventsByDate']),
    date() {
      return new Date(
        `${this.year}-${this.month.toString().padStart(2, 0)}-${this.day}`,
      )
    },
    days() {
      return new Date(this.year, this.month, 0).getDate()
    },
    eventsOfMonth() {
      if (
        this.eventsByDate[this.year] &&
        this.eventsByDate[this.year][this.month]
      ) {
        return this.eventsByDate[this.year][this.month]
      } else return {}
    },
  },
  methods: {
    nextMonth() {
      if (this.month === 12) {
        this.month = 1
        this.year++
      } else this.month++
    },
    previousMonth() {
      if (this.month === 1) {
        this.month = 12
        this.year--
      } else this.month--
    },
  },
}
</script>

<style>
.dates-container {
  /* autoprefixer: off */
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  grid-gap: 10px;
  flex-grow: 1;
}
@media screen and (min-width: 900px) {
  .dates-container {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }
}
.next-month,
.prev-month {
  width: 2rem;
  height: 2rem;
  background: grey;
  display: inline-block;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  margin: 0 0 0 1rem;
}
</style>
