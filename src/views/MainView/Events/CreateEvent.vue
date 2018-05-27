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
      <form method="post" @submit.prevent="publish">
        <title-bar label="Forum" title="Event erstellen">
          <button class="button-main" type="submit">Erstellen</button>
        </title-bar>
        <button @click="$router.push('/events')" type="button" class="button-secondary">Zurück (Abbrechen)</button>
        <event-form v-model="form" />
      </form>
      <input type="file" @change="readImage" accept="image/*" class="hide" ref="imageInput">
    </main>
  </with-hero-image>
</template>

<script>
  import { generateId, readImageFromInput } from "@/lib/helpers";
  import placeholderImage from "@/assets/images/hero-placeholder.svg";
  import { mapActions, mapGetters } from "vuex";
  import { ADD_EVENT } from "@/store/modules/events/types";
  import EventForm from "@/components/EventForm";
  import WithHeroImage from "@/components/WithHeroImage";
  import TitleBar from "@/components/TitleBar";

  export default {
    name: "CreatePost",
    components: {
      WithHeroImage,
      TitleBar,
      EventForm
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
        placeholderImage
      };
    },
    computed: {
      ...mapGetters("userStore", ["currentUser"])
    },
    methods: {
      ...mapActions("eventStore", { addEvent: ADD_EVENT }),
      publish() {
        if (!this.form.title) return;
        const event = this.createEvent();
        this.addEvent(event);
        this.$router.push(`/events/event/${event.id}`);
      },
      createEvent() {
        const { title, content, date, location, usergroup } = this.form;
        const event = {
          title,
          content,
          date,
          location,
          usergroup,
          image: this.image,
          username: this.currentUser.username,
          attending: true,
          id: generateId()
        };
        return event;
      },
      async readImage(evt) {
        this.image = await readImageFromInput(evt);
        this.$refs.imageInput.value = "";
      }
    }
  };
</script>