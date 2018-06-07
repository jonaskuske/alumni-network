<template>
  <main class="subforums">
    <title-bar label="Forum" title="Unterforen" />
    <router-link class="button-secondary" to="/forum">Zurück zur Übersicht</router-link>
    <subforum-thumbnail v-for="(subforum, i) in subforums" :subforum="subforum" :key="i" class="subforums__thumbnail" />
  </main>
</template>

<script>
import { mapState } from 'vuex'
import TitleBar from '@/components/TitleBar'
import SubforumThumbnail from '@/components/SubforumThumbnail'

export default {
  name: 'Subforums',
  components: { TitleBar, SubforumThumbnail },
  computed: {
    ...mapState('forumStore', ['subforums']),
  },
}
</script>

<style>
.subforums {
  width: 100%;
}
.subforums__thumbnail {
  margin: 1rem 0;
}
</style>
