<template>
  <div
    :class="[
      {'gallery-thumbnail--empty': !image},
      {'gallery-thumbnail--clickable': clickable},
      {'gallery-thumbnail--round': circle}
    ]"
    :style="{backgroundImage: `url(${image})`}"
    class="gallery-thumbnail"
    @click="$emit('click', $event)"
  />
</template>

<script>
export default {
  name: 'GalleryThumbnail',
  props: {
    image: {
      type: String,
      required: false,
      default: '',
    },
    clickable: {
      type: Boolean,
      required: false,
      default: false,
    },
    circle: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style>
.gallery-thumbnail {
  position: relative;
  background: none center / cover no-repeat;
  width: 100%;
}
.gallery-thumbnail--clickable {
  cursor: pointer;
}
.gallery-thumbnail::before {
  content: '';
  display: block;
  padding-bottom: 100%;
}
.gallery-thumbnail--clickable::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none center / 75% no-repeat;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 180ms ease-out;
  opacity: 0;
}
.gallery-thumbnail--empty::after {
  opacity: 1;
  background: url(~@/assets/icons/plus.svg) center / 60% no-repeat !important;
}
.gallery-thumbnail--clickable:hover::after {
  opacity: 1;
}
.gallery-thumbnail--round,
.gallery-thumbnail--round::before,
.gallery-thumbnail--round::after {
  border-radius: 50%;
}
</style>
