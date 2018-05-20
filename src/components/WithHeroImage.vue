<template>
  <div class="with-hero-image">
    <div v-if="image" :class="['with-hero-image__wrapper', {'with-hero-image__wrapper--fixed': fixed && forceFixed}]">
      <div
        :class="[
          'with-hero-image__image',
          {'with-hero-image__image--fullsize': fullsize || forceFullsize},
          {'with-hero-image__image--center': center}
        ]"
        :style="{backgroundImage: `url(${image})`}"
      />
    </div>
    <div :class="{'with-hero-image__page': image}">
      <slot />
    </div>
  </div>
</template>

<script>
import { wait } from "@/lib/helpers";

export default {
  name: "WithHeroImage",
  props: {
    image: {
      type: String,
      required: false
    },
    center: {
      type: Boolean,
      required: false,
      default: true
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false
    },
    fullsize: {
      type: Boolean,
      required: false,
      default: false
    },
    transition: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({ forceFullsize: false, forceFixed: false }),
  created() {
    if (!this.transition) return (this.forceFixed = this.fixed);
    wait(450).then(() => {
      this.forceFullsize = true;
      this.forceFixed = this.fixed;
    });
  }
};
</script>


<style>
.with-hero-image {
  width: 100%;
  margin-top: 4rem;
}
.with-hero-image__wrapper {
  position: relative;
  width: 100%;
  height: 40vh;
  margin: 0 0 -40vh 0;
  left: 0;
}
.with-hero-image__wrapper--fixed {
  position: fixed;
  margin-bottom: 0;
  left: calc(-50vw + 50%);
  overflow: hidden;
  z-index: -1;
}
.with-hero-image__image {
  position: absolute;
  display: block;
  top: 0;
  left: calc(-50vw + 50%);
  background: url() center / cover no-repeat;
  width: 100vw;
  height: 67vh;
  transform: scale(0.9);
  transform-origin: top;
  transition: transform 450ms ease-in-out;
  z-index: -1;
}
@media screen and (min-width: 900px) {
  .with-hero-image__image {
    transform: scale(0.8);
  }
}
@media screen and (min-width: 1620px) {
  .with-hero-image__image {
    transform: scale(0.7);
  }
}
@media screen and (min-width: 1880px) {
  .with-hero-image__image {
    transform: scale(0.6);
  }
}
.with-hero-image__image--center {
  top: -14vh;
  transform-origin: center;
}
.with-hero-image__image--fullsize {
  transform: scale(1);
}
.with-hero-image__page {
  position: relative;
  margin-top: 40vh;
  min-height: 60vh;
}
.with-hero-image__page::before {
  content: "";
  position: absolute;
  width: 100vw;
  height: 100%;
  left: calc(-50vw + 50%);
  right: calc(50vw - 50%);
  top: 0;
  background: white;
  z-index: -1;
}
</style>
