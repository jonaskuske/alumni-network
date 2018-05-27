<template>
  <with-hero-image
    @click="$refs.imageInput.click()"
    :clickable="true"
    :image="image || placeholderImage"
    :fullsize="!!image"
  >
    <main class="create-post">
    <button
        type="button"
        v-if="image"
        @click="image = ''"
        class="create-post__remove-image"
      >
        Bild entfernen
      </button>
      <form method="post" @submit.prevent="save">
        <title-bar label="Events" title="Event bearbeiten">
          <button class="button-main button--danger" @click="deleteAndLeave" type="button">Löschen</button>
          <button class="button-main" type="submit">Speichern</button>
        </title-bar>
        <button @click="$router.push('/events')" type="button" class="button-secondary">Zurück (Abbrechen)</button>
        <event-form v-model="form" />
      </form>
      <input type="file" @change="readImage" accept="image/*" class="hide" ref="imageInput">
    </main>
  </with-hero-image>
</template>

<script>
  import { readImageFromInput } from "@/lib/helpers";
  import placeholderImage from "@/assets/images/hero-placeholder.svg";
  import { mapGetters, mapActions } from "vuex";
  import { REPLACE_EVENT, DELETE_EVENT } from "@/store/modules/events/types";
  import EventForm from "@/components/EventForm";
  import WithHeroImage from "@/components/WithHeroImage";
  import TitleBar from "@/components/TitleBar";

  export default {
    name: "EditEvent",
    components: {
      WithHeroImage,
      TitleBar,
      EventForm
    },
    props: ["id"],
    created() {
      if (this.eventsById[this.id]) this.getEvent();
    },
    data() {
      return {
        form: {
          title: "",
          content: "",
          date: "2018-01-01",
          location: "",
          usergroup: ""
        },
        image: "",
        data: {},
        event: {},
        placeholderImage
      };
    },
    computed: {
      ...mapGetters("userStore", ["currentUser"]),
      ...mapGetters("eventStore", ["eventsById"])
    },
    watch: {
      eventsById(events) {
        if (events[this.id]) this.getEvent();
      }
    },
    methods: {
      ...mapActions("eventStore", {
        replaceEvent: REPLACE_EVENT,
        deleteEvent: DELETE_EVENT
      }),
      save() {
        const newEvent = { ...this.form, ...this.data, image: this.image };
        this.replaceEvent(newEvent);
        this.$router.push(`/events/event/${newEvent.id}`);
      },
      deleteAndLeave() {
        this.deleteEvent(this.event);
        this.$router.push("/events");
      },
      getEvent() {
        const event = this.eventsById[this.id];
        if (this.currentUser.username !== event.username) {
          return this.$router.push(`/events/event/${event.id}`);
        }

        const {
          title,
          content,
          usergroup,
          date,
          location,
          image,
          ...data
        } = event;
        this.event = event;
        this.form = {
          title,
          content,
          date: this.dateString(date),
          location,
          usergroup
        };
        this.image = image;
        this.data = data;
      },
      dateString(n) {
        const date = new Date(n);
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, 0);
        const d = date.getDate();
        return `${y}-${m}-${d}`;
      },
      async readImage(evt) {
        const image = await readImageFromInput(evt);
        this.image = image;
      }
    }
  };
</script>
