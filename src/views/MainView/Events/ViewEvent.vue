<template>
  <with-hero-image :image="event.image" :transition="true">
    <main>
      <title-bar :title="event.title || 'Event nicht gefunden'" label="Event">
        <template v-if="byUser">
          <button class="button-main button--danger post__delete" @click="deleteAndLeave">Löschen</button>
          <button class="button-main" @click="$router.push(`/events/event/${event.id}/edit`)">Bearbeiten</button>
        </template>
      </title-bar>
      <section v-if="!byUser" class="forum__links">
        <button
          :class="[{attending: event.attending}, {inactive: event.attending === false}]"
          class="button-secondary view-event__attend"
          @click="attend(true)">
          Teilnehmen
        </button>
        <button
          :class="[{'not-attending': event.attending === false}, {inactive: event.attending}]"
          class="button-secondary view-event__refuse"
          @click="attend(false)">
          Absagen
        </button>
      </section>
      <h3>Findet statt am {{ event.date | date }}</h3>
      <section id="content" class="post__content">
        <p class="post__text" v-html="sanitizedContent"/>
        <div class="post__content-meta">
          <p class="meta-label">Ort</p>
          <p class="meta-text">{{ event.location }}</p>
          <p v-if="event.username" class="meta-label">Gastgeber</p>
          <p class="meta-text">{{ host }}</p>
          <p class="meta-label">Nutzergruppe:</p>
          <p class="meta-text">{{ event.usergroup }}</p>
        </div>
      </section>
    </main>
  </with-hero-image>
</template>

<script>
import { DELETE_EVENT, SET_ATTENDING_STATE } from '@/store/modules/events/types'
import { mapGetters, mapActions } from 'vuex'
import WithHeroImage from '@/components/WithHeroImage'
import TitleBar from '@/components/TitleBar'

export default {
  name: 'Event',
  components: { WithHeroImage, TitleBar },
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    ...mapGetters('eventStore', ['eventsById']),
    ...mapGetters('userStore', ['currentUser', 'usersByUsername']),
    event() {
      return this.eventsById[this.id] || {}
    },
    host() {
      const user = this.usersByUsername[this.event.username]
      return user ? user.name : this.event.username ? this.event.username : ''
    },
    sanitizedContent() {
      const content = this.event.content
      return content ? this.$sanitize(content.replace(/\n/g, '<br>')) : ''
    },
    byUser() {
      return this.event.username === this.currentUser.username
    },
  },
  methods: {
    ...mapActions('eventStore', {
      deleteEvent: DELETE_EVENT,
      setAttendingState: SET_ATTENDING_STATE,
    }),
    deleteAndLeave() {
      this.deleteEvent(this.event)
      this.$router.push('/events')
    },
    attend(value) {
      this.setAttendingState({ ...this.event, value })
    },
  },
}
</script>

<style>
.view-event__attend,
.view-event__refuse {
  transition: padding 260ms ease-out;
  outline: none;
}
.view-event__attend::before,
.view-event__refuse::before {
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  top: 50%;
  bottom: 0;
  width: 1rem;
  height: 1rem;
  opacity: 0;
  content: url(~@/assets/icons/check-dark.svg);
  transition: opacity 120ms ease-out;
}
.view-event__refuse::before {
  content: url(~@/assets/icons/cross-dark.svg);
}
.inactive {
  border-bottom: 2px solid #2c3e50;
}
.attending {
  padding-left: 1.2rem;
  border-bottom: 2px solid #15b100;
}
.attending::before {
  opacity: 1;
}
.not-attending {
  padding-left: 1.2rem;
  border-bottom: 2px solid #b90000;
}
.not-attending::before {
  opacity: 1;
}
.attending::before,
.not-attending::before {
  transition: opacity 150ms 120ms ease-out;
}
</style>
