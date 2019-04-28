<template>
  <thumbnail
    :title="event.title"
    :subtitle="`Ort: ${event.location}`"
    :image="event.image"
    :tag="event.usergroup"
    @click="$router.push(`/events/event/${event.id}`)"
  >
    <template slot="meta">
      <p>{{ event.date | date }}</p>
    </template>
    <template slot="buttons">
      <template v-if="!byUser">
        <button-small
          :class="[{ 'icon--bg-green': event.attending === true }]"
          class="event-thumbnail__button icon--checkmark"
          @click.prevent="setAttendingState({ id: event.id, value: true })"
        />
        <button-small
          :class="[{ 'icon--bg-red': event.attending === false }]"
          class="event-thumbnail__button icon--cross"
          @click.prevent="setAttendingState({ id: event.id, value: false })"
        />
      </template>
      <template v-else>
        <p style="margin-right: 1rem">Gastgeber</p>
        <button-small
          class="icon--edit"
          @click.prevent="$router.push(`/events/event/${event.id}/edit`)"
        />
      </template>
    </template>
  </thumbnail>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { SET_ATTENDING_STATE } from '@/store/modules/events/types';
import Thumbnail from './Thumbnail';
import ButtonSmall from '@/components/ButtonSmall';

export default {
  components: { Thumbnail, ButtonSmall },
  props: {
    event: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters('userStore', ['currentUser']),
    byUser() {
      return this.event.username === this.currentUser.username;
    },
  },
  methods: {
    ...mapActions('eventStore', { setAttendingState: SET_ATTENDING_STATE }),
  },
};
</script>

<style>
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
