<template>
  <div>
    <the-header v-if="!onLandingPage" />

    <transition mode="out-in" name="fade">
      <router-view />
    </transition>

    <the-footer v-if="!onLandingPage" />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  components: { TheHeader, TheFooter },
  data: () => ({ onLandingPage: true }),
  watch: {
    $route({ path }) {
      this.onLandingPage = path.includes('login')
    },
  },
  created() {
    this.onLandingPage = this.$route.path.includes('login')
  },
}
</script>
