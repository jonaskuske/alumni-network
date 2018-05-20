<template>
  <thumbnail
    :title="event.title"
    :subtitle="`Ort: ${event.location}`"
    :image="event.image"
    :tag="event.usergroup"
    @click="$router.push(`/events?event=${event.id}`)"
  >
    <template slot="meta">
        <p class="event-thumbnail__date">{{ event.date | date }}</p>
    </template>
    <template slot="buttons">
          <button-small
            class="event-thumbnail__button icon--checkmark"
            :class="{'icon--bg-green': isAttending}"
            @click.prevent="setAttendingState({id: event.id, value: true})"
          />
          <button-small
            class="event-thumbnail__button icon--cross"
            :class="{'icon--bg-red': isNotAttending}"
            @click.prevent="setAttendingState({id: event.id, value: false})"
          />
    </template>
  </thumbnail>
</template>

<script>
import { mapActions } from "vuex";
import Thumbnail from "./Thumbnail";
import ButtonSmall from "@/components/ButtonSmall";

export default {
  components: {
    Thumbnail,
    ButtonSmall
  },
  props: {
    event: {
      type: Object,
      required: true,
      default: () => ({
        id: 0,
        title: "",
        image: "",
        location: "",
        usergroup: "",
        date: new Date(),
        attending: undefined
      })
    }
  },
  computed: {
    isAttending() {
      return this.event.attending;
    },
    isNotAttending() {
      return this.event.attending !== undefined && !this.event.attending;
    }
  },
  methods: {
    ...mapActions("eventStore", ["setAttendingState"])
  }
};
</script>

<style>
.event-thumbnail__date {
  font-size: 0.9rem;
}
.event-thumbnail__button {
  flex-basis: 33%;
  transition: background-color 170ms ease-in;
  background-color: #282828;
}
.event-thumbnail__button:hover {
  background-color: #909090;
}
.icon--bg-green,
.icon--bg-green:hover {
  background-color: #15b100;
}
.icon--bg-red,
.icon--bg-red:hover {
  background-color: #b90000;
}
.icon--checkmark {
  background-image: url(~@/assets/icons/check.svg);
}
.icon--cross {
  background-image: url(~@/assets/icons/cross.svg);
}
</style>
