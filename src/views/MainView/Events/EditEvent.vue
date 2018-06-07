<template>
  <with-hero-image
    :clickable="true"
    :image="image || placeholderImage"
    :fullsize="!!image"
    @click="$refs.imageInput.click()"
  >
    <main class="create-post">
      <button
        v-if="image"
        type="button"
        class="create-post__remove-image"
        @click="image = ''"
      >
        Bild entfernen
      </button>
      <form method="post" @submit.prevent="save">
        <title-bar label="Events" title="Event bearbeiten">
          <button class="button-main button--danger" type="button" @click="deleteAndLeave">Löschen</button>
          <button class="button-main" type="submit">Speichern</button>
        </title-bar>
        <button type="button" class="button-secondary" @click="$router.push('/events')">Zurück (Abbrechen)</button>
        <event-form v-model="form" />
      </form>
      <input
        ref="imageInput"
        type="file"
        accept="image/*"
        class="hide"
        @change="readImage">
    </main>
  </with-hero-image>
</template>

<script>
import { readImageFromInput } from '@/lib/helpers'
import placeholderImage from '@/assets/images/hero-placeholder.svg'
import { mapGetters, mapActions } from 'vuex'
import { REPLACE_EVENT, DELETE_EVENT } from '@/store/modules/events/types'
import EventForm from '@/components/EventForm'
import WithHeroImage from '@/components/WithHeroImage'
import TitleBar from '@/components/TitleBar'

export default {
  name: 'EditEvent',
  components: {
    WithHeroImage,
    TitleBar,
    EventForm,
  },
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        date: '2018-01-01',
        location: '',
        usergroup: '',
      },
      image: '',
      data: {},
      event: {},
      placeholderImage,
    }
  },
  computed: {
    ...mapGetters('userStore', ['currentUser']),
    ...mapGetters('eventStore', ['eventsById']),
  },
  watch: {
    eventsById(events) {
      if (events[this.id]) this.getEvent()
    },
  },
  created() {
    if (this.eventsById[this.id]) this.getEvent()
  },
  methods: {
    ...mapActions('eventStore', {
      replaceEvent: REPLACE_EVENT,
      deleteEvent: DELETE_EVENT,
    }),
    save() {
      const { date, ...form } = this.form
      const newEvent = {
        ...form,
        ...this.data,
        date: new Date(date).getTime(),
        image: this.image,
      }
      this.replaceEvent(newEvent)
      this.$router.push(`/events/event/${newEvent.id}`)
    },
    deleteAndLeave() {
      this.deleteEvent(this.event)
      this.$router.push('/events')
    },
    getEvent() {
      const event = this.eventsById[this.id]
      if (this.currentUser.username !== event.username) {
        return this.$router.push(`/events/event/${event.id}`)
      }

      const {
        title,
        content,
        usergroup,
        date,
        location,
        image,
        ...data
      } = event
      this.event = event
      this.form = {
        title,
        content,
        date: this.dateString(date),
        location,
        usergroup,
      }
      this.image = image
      this.data = data
    },
    dateString(n) {
      const date = new Date(n)
      const y = date.getFullYear()
      const m = (date.getMonth() + 1).toString().padStart(2, 0)
      const d = date.getDate()
      return `${y}-${m}-${d}`
    },
    async readImage(evt) {
      const image = await readImageFromInput(evt)
      this.image = image
    },
  },
}
</script>
