<template>
  <div class="with-hero-image">
    <div
      v-if="image"
      @click="$emit('click', $event)"
      :class="[
        'with-hero-image__wrapper',
        {'with-hero-image__wrapper--fixed': fixed && forceFixed},
        {'with-hero-image__wrapper--clickable': clickable},
        {'with-hero-image__wrapper--clickable--fullsize': fullsize || forceFullsize}
      ]">
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
    },
    clickable: {
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
  width: 100vw;
  overflow: hidden;
}
.with-hero-image__wrapper--clickable {
  cursor: pointer;
}
.with-hero-image__wrapper--clickable::after {
  content: "";
  position: absolute;
  left: calc(-50vw + 50%);
  width: 100vw;
  height: 100%;
  transform: scaleX(0.9);
  transition: opacity 180ms ease-out, transform 540ms ease-in-out;
  background: radial-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  opacity: 0;
}
.with-hero-image__wrapper--clickable:hover::after {
  opacity: 1;
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
  .with-hero-image__wrapper--clickable::after {
    transform: scaleX(0.8);
  }
}
@media screen and (min-width: 1620px) {
  .with-hero-image__image {
    transform: scale(0.7);
  }
  .with-hero-image__wrapper--clickable::after {
    transform: scaleX(0.7);
  }
}
@media screen and (min-width: 1880px) {
  .with-hero-image__image {
    transform: scale(0.6);
  }
  .with-hero-image__wrapper--clickable::after {
    transform: scaleX(0.6);
  }
}
.with-hero-image__image--center {
  top: -14vh;
  transform-origin: center;
}
.with-hero-image__image--fullsize,
.with-hero-image__wrapper--clickable--fullsize::after {
  transform: scale(1);
}
.with-hero-image__page {
  position: relative;
  margin-top: 40vh;
  min-height: 60vh;
  z-index: 1;
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
