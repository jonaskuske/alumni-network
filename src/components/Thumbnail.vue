<template>
  <div class="thumbnail" @click="$emit('click', $event)">
    <img :src="image" alt="" class="thumbnail__image">
    <p v-if="tag" class="thumbnail__tag">{{ tag }}</p>
    <div class="thumbnail__content">
      <p class="thumbnail__title">{{ title }}</p>
      <p class="thumbnail__subtitle">{{ subtitle }}</p>
    </div>
    <footer class="thumbnail__footer" @click.stop>
      <div class="thumbnail__meta-container">
        <slot name="meta" />
      </div>
      <div class="thumbnail__button-container">
        <slot name="buttons" />
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Thumbnail',
  props: {
    image: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
.thumbnail {
  position: relative;
  width: 100%;
  cursor: pointer;
  background: #f0f0f0;
}
.thumbnail::before {
  content: '';
  display: block;
  padding-top: 75%;
}
.thumbnail::after {
  content: '';
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
.thumbnail:hover::after {
  opacity: 1;
}
.thumbnail__link {
  color: #2c3e50;
  text-decoration: none;
}
.thumbnail__tag {
  margin: 0;
  padding: 0;
  background: rgba(87, 87, 222, 0.801);
  color: #f0f0f0;
  width: 45%;
  margin-left: 10px;
  height: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
}
.thumbnail__image {
  top: 0;
  left: 0;
  width: 100%;
  height: 83%;
  position: absolute;
  object-fit: cover;
}
.thumbnail__content {
  position: absolute;
  bottom: 17%;
  height: 30%;
  width: 100%;
  padding: 10px;
  background: rgba(240, 240, 240, 0.85);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.thumbnail__title,
.thumbnail__subtitle {
  width: 100%;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.thumbnail__title {
  font-weight: bold;
  font-size: 1.1rem;
}
.thumbnail__subtitle {
  font-size: 0.9rem;
}
.thumbnail__footer {
  display: flex;
  justify-content: space-between;
  align-content: center;
  position: absolute;
  height: 17%;
  bottom: 0;
  left: 0;
  width: 100%;
  cursor: default;
  padding: 0 10px;
  box-sizing: border-box;
}
.thumbnail__footer p {
  font-size: 0.85rem;
}
.thumbnail__meta-container {
  flex: 7;
  display: flex;
  align-items: center;
}
.thumbnail__button-container {
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
