<template>
  <main class="search">
    <title-bar title="Netzwerk durchsuchen" label="Suche" />
    <labelled-input v-model="query" label="Suchen..." class="search__input" />
    <transition-group v-if="query" name="test" mode="out-in">
      <p
        v-for="i in 4"
        :key="i"
        class="search__result"
        v-text="'Suchergebnis ' + i"
      />
    </transition-group>
  </main>
</template>

<script>
import LabelledInput from '@/components/LabelledInput';
import TitleBar from '@/components/TitleBar';

export default {
  name: 'Search',
  components: { TitleBar, LabelledInput },
  data() {
    return {
      query: '',
    };
  },
};
</script>

<style>
.search {
  width: 100%;
}
.search__input {
  font-size: 2.2rem;
  margin-bottom: 4rem;
}
.search__result {
  padding: 1rem;
  background: #f0f0f0;
}
.test-enter,
.test-leave-to {
  opacity: 0;
  transform: scaleY(0.6);
}
.test-enter-active,
.test-leave-active {
  transition: opacity 200ms ease-out, transform 200ms ease-out;
}
.test-move {
  transition: transform 200ms;
}
</style>
