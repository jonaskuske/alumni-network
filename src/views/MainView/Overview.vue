<template>
  <with-hero-image :image="heroImage" :transition="true" :fixed="!mobileLayout" :center="false">
    <main class="overview">

      <section>
        <p class="title-label">Willkommen</p>
        <h1 class="title">DMP Alumni Netzwerk</h1>
        <p class="overview__introduction">
          Nach langer Zeit findet wieder mal ein Plakatwettbewerb für den DMP Tag 2018 statt.<br>
          Neu: dieses Jahr dürfen auch Alumni teilnehmen, ihre Beiträge werden in einen extra Raum ausgestellt. Außerdem gibt es einen zusäzlichen kleinen Preis für den besten Beitrag eines Alumni.<br>
          Außerdem sind alle eingeladen, an unserem Stammtisch lorem ipsum dolor sit amet, neque sunt illibur et omanes curiosas. Cum nequam est sunter interesatatas. <br>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor. <br>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. <br>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </p>
      </section>

      <section v-if="posts.length">
        <p class="title-label">Forum</p>
        <h2 class="subtitle">Neueste Beiträge</h2>
        <div class="thumbnail-grid">
          <post-thumbnail v-for="post in posts" :key="post.id" :post="post" class="overview__thumbnail" />
        </div>
      </section>

      <section v-if="events.length">
        <p class="title-label">Events</p>
        <h2 class="subtitle">Nächste Termine</h2>
        <div class="thumbnail-grid">
          <event-thumbnail
            v-for="event in events"
            :key="event.id"
            :event="event"
            class="overview__thumbnail"
          />
        </div>
      </section>


    </main>
  </with-hero-image>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import heroImage from '@/assets/images/hero-overview.jpg'

import WithHeroImage from '@/components/WithHeroImage'
import EventThumbnail from '@/components/EventThumbnail'
import PostThumbnail from '@/components/PostThumbnail'

export default {
  components: {
    WithHeroImage,
    EventThumbnail,
    PostThumbnail,
  },
  data: () => ({ heroImage }),
  computed: {
    ...mapGetters('eventStore', { events: 'eventsSortedByOldest' }),
    ...mapGetters('forumStore', { posts: 'postsSortedByNewest' }),
    ...mapState(['mobileLayout']),
  },
}
</script>


<style>
@media screen and (min-width: 1500px) {
  .overview__introduction {
    column-count: 2;
  }
}
@media screen and (max-width: 700px) {
  .overview__thumbnail {
    max-width: 365px;
  }
}
.thumbnail-grid {
  /* autoprefixer: off */
  display: grid;
  grid-template: auto / repeat(auto-fill, minmax(275px, 1fr));
  grid-gap: 20px;
}
</style>
