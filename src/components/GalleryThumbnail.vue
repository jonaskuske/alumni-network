<template>
  <div
    @click="$emit('click', $event)"
    class="gallery-thumbnail"
    :class="{'gallery-thumbnail--empty': !image}"
    :style="{backgroundImage: `url(${image})`}"
  />
</template>

<script>
export default {
  name: "GalleryThumbnail",
  props: ["image"]
};
</script>

<style>
.gallery-thumbnail {
  position: relative;
  background: none center / cover no-repeat;
  width: 100%;
  cursor: pointer;
}
.gallery-thumbnail::before {
  content: "";
  display: block;
  padding-bottom: 100%;
}
.gallery-thumbnail::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(~@/assets/icons/delete.svg) center / 75% no-repeat;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 180ms ease-out;
  opacity: 0;
}
.gallery-thumbnail--empty::after {
  background: url(~@/assets/icons/plus.svg) center / 60% no-repeat;
}
.gallery-thumbnail:hover::after {
  opacity: 1;
}
</style>
