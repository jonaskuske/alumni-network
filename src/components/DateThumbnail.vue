<template functional>
  <div :style="{backgroundImage: `url(${props.events && props.events[0].image}`}" class="date-thumbnail" @click="listeners.click">
    <p>{{ props.day }}</p>
  </div>
</template>

<style>
.date-thumbnail {
  width: 100%;
  height: 100%;
  background: #f0f0f0 center / cover no-repeat;
  position: relative;
  cursor: pointer;
}
.date-thumbnail::before {
  content: '';
  display: block;
  padding-top: 100%;
}
.date-thumbnail::after {
  content: '';
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.15);
  transition: opacity 200ms ease-out;
  opacity: 0;
}
.date-thumbnail:hover::after {
  opacity: 1;
}
.date-thumbnail > p {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  margin: 0;
  background: rgba(240, 240, 240, 0.8);
  backdrop-filter: blur(3px);
}
</style>
