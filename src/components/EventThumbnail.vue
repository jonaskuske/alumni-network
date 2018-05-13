<template>
  <router-link :to="`/events?event=${event.index}`" class="event-thumbnail__link">
    <div class="event-thumbnail">
      <img :src="event.image" alt="" class="event-thumbnail__image">
      <p class="event-thumbnail__usergroup">{{ event.usergroup || "Alle" }}</p>
      <div class="event-thumbnail__infobox">
        <p class="event-thumbnail__title">{{ event.title }}</p>
        <p class="event-thumbnail__location">Ort: {{ event.location }}</p>
      </div>
      <footer class="event-thumbnail__footer" @click.prevent>
        <div><p class="event-thumbnail__date">{{ event.date | date }}</p></div>
        <div class="event-thumbnail__button-container">
          <div class="event-thumbnail__button-wrapper">
            <button
              class="event-thumbnail__button button__check"
              :class="{'button--green': isAttending}"
              @click.prevent="setAttendingState({index: event.index, value: true})"
            />
          </div>
          <div class="button__spacer" />
          <div class="event-thumbnail__button-wrapper">
            <button
              class="event-thumbnail__button button__cross"
              :class="{'button--red': isNotAttending}"
              @click.prevent="setAttendingState({index: event.index, value: false})"
            />
          </div>
        </div>
      </footer>
    </div>
  </router-link>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    event: {
      type: Object,
      required: true,
      default: () => ({
        title: "7. Alumni Stammtisch",
        image:
          "http://blog.radissonblu.de/wp-content/uploads/sites/3/2017/11/Party.jpg",
        location: "Schäbige Eckkneipe in Lehe",
        usergroup: "Alumni",
        date: new Date(),
        attending: undefined,
        index: 0
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

<style scoped>
.event-thumbnail__link {
  color: #2c3e50;
  text-decoration: none;
  position: relative;
}
.event-thumbnail__link::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 0 13px 1px rgba(0, 0, 0, 0.3);
  transition: opacity 180ms ease-out;
  opacity: 0;
  z-index: -1;
}
.event-thumbnail__link:hover::after {
  opacity: 1;
}
.event-thumbnail {
  position: relative;
  width: 100%;
  padding-bottom: 75%;
  overflow: hidden;
}
.event-thumbnail::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  background: #f0f0f0;
  z-index: -1;
}
.event-thumbnail__date,
.event-thumbnail__usergroup {
  margin: 0;
  padding: 0;
}
.event-thumbnail__usergroup {
  background: rgba(51, 51, 201, 0.801);
  color: #f0f0f0;
  width: 45%;
  margin-left: 10px;
  text-align: center;
  height: 1.4rem;
}
.event-thumbnail__image {
  top: 0;
  left: 0;
  width: 100%;
  height: 83%;
  position: absolute;
  object-fit: cover;
  z-index: -1;
}
.event-thumbnail__infobox {
  position: absolute;
  bottom: 16%;
  height: 30%;
  width: 102%;
  left: -1%;
  padding: 10px;
  background: rgba(240, 240, 240, 0.719);
  backdrop-filter: blur(2px);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.event-thumbnail__title,
.event-thumbnail__location {
  width: 100%;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.event-thumbnail__title {
  font-weight: bold;
  font-size: 1.1rem;
}
.event-thumbnail__location {
  font-size: 0.9rem;
}
.event-thumbnail__footer {
  display: flex;
  justify-content: space-between;
  align-content: center;
  position: absolute;
  height: 17%;
  bottom: 0;
  left: 0;
  width: 100%;
  cursor: default;
}
.event-thumbnail__footer > div {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.event-thumbnail__date {
  font-size: 0.9rem;
}
.event-thumbnail__button-container {
  width: 25%;
  justify-content: space-between;
  padding-right: 10px;
}
.event-thumbnail__button-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
}
.event-thumbnail__button {
  border: none;
  background: #282828 center / 60% no-repeat;
  width: 100%;
  height: 70%;
  padding: 0;
  padding-bottom: 100%;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  transition: background-color 150ms ease-in;
  position: relative;
}
.event-thumbnail__button:hover {
  background-color: #808080;
}
.button__spacer {
  width: 80%;
}
.button--green,
.button--green:hover {
  background-color: #15b100;
}
.button--red,
.button--red:hover {
  background-color: #b90000;
}
.button__check {
  background-image: url(~@/assets/icons/check.svg);
}
.button__cross {
  background-image: url(~@/assets/icons/cross.svg);
}
</style>
