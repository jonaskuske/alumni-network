<template>
  <div>
    <section class="overview__image" :class="overviewImgClasslist"></section>
    <section class="overview__content">
      <section class="overview__section">
        <p class="heading-block__label">Willkommen</p>
        <h1 class="heading-block__title">DMP Alumni Netzwerk</h1>

        <p class="overview__newstext">
          Nach langer Zeit findet wieder mal ein Plakatwettbewerb für den DMP Tag 2018 statt, eingeladen, an unserem Stammtisch lorem ipsum dolor sit amet, neque sunt illibur et omanes curiosas. Cum nequam est sunter interesatatas.
          <br>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.
          <br>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          <br>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor. Lorem ipsum dolor sit   amet, consetetur sadipscing elitr.
        </p>
      </section>
      <section class="overview__section overview__events">
        <p class="heading-block__label">Veranstaltungen</p>
        <h2 class="heading-block__subtitle">Anstehende Events</h2>
        <div class="thumbnail-area">
          <event-thumbnail v-for="(event, i) in indexedEvents" :key="i" :event="event" />
        </div>
      </section>
      <section class="overview__section">
        <p class="heading-block__label">Forum</p>
        <h2 class="heading-block__subtitle">Letzte Beiträge</h2>
        <div class="thumbnail-area">
          <post-thumbnail v-for="(post, i) in indexedPosts" :key="i" :post="post" />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { wait } from "@/lib/helpers";
import EventThumbnail from "@/components/EventThumbnail";
import PostThumbnail from "@/components/PostThumbnail";

export default {
  components: {
    EventThumbnail,
    PostThumbnail
  },
  data() {
    return {
      overviewImgClasslist: []
    };
  },
  computed: {
    ...mapState("eventStore", ["events"]),
    ...mapState("forumStore", ["posts"]),
    indexedEvents() {
      return this.events.map((el, index) => ({ ...el, index }));
    },
    indexedPosts() {
      return this.posts.map((el, index) => ({ ...el, index }));
    }
  },
  async created() {
    await wait(450);
    this.overviewImgClasslist.push("overview__image--fixed");
    await wait(50);
    this.overviewImgClasslist.push("overview__image--scale");
  }
};
</script>


<style>
.overview__image {
  position: relative;
  width: 100%;
  height: 40vh;
  margin-bottom: -40vh;
  z-index: -1;
}
.overview__image::before {
  content: "";
  position: absolute;
  top: calc(-40vh + 50%);
  left: calc(-50vw + 50%);
  right: calc(50vw - 50%);
  background: url("~@/assets/bg-overview.jpg") 50% 25% / cover no-repeat;
  width: 100vw;
  height: 100vh;
  transform: scale(0.7);
  transition: transform 390ms ease-in-out;
}
.overview__image--scale::before {
  transform: scale(1);
}
.overview__content {
  position: relative;
  margin-top: 40vh;
  padding: 1rem 0 3rem 0;
}
.overview__content::before {
  content: "";
  position: absolute;
  height: 100%;
  left: calc(-50vw + 50%);
  width: 100vw;
  right: calc(50vw - 50%);
  top: 0;
  background: white;
  z-index: -1;
}
.overview__section {
  margin-top: 3rem;
}
.overview__section:first-of-type {
  margin-top: 1rem;
}
.heading-block__title,
.heading-block__subtitle,
.heading-block__label {
  text-transform: uppercase;
  width: 100%;
  margin: 0;
  padding: 0;
}
.heading-block__label {
  font-size: 1.1rem;
}
.heading-block__title {
  font-size: 1.5rem;
}
.heading-block__subtitle {
  font-size: 1.5rem;
}
.thumbnail-area {
  display: grid;
  grid-template: auto / repeat(auto-fill, minmax(266px, 1fr));
  grid-gap: 20px;
  margin-top: 1rem;
}
@media screen and (min-width: 400px) {
  .heading-block__title {
    font-size: 1.9rem;
  }
}
@media screen and (min-width: 900px) {
  .overview__image--fixed {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: initial;
  }
  .heading-block__label {
    font-size: 1.3rem;
  }
  .heading-block__title {
    font-size: 2.5rem;
  }
  .heading-block__subtitle {
    font-size: 1.9rem;
  }
}
</style>
