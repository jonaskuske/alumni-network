<template functional>
  <div
    alt=""
    :class="['avatar-thumb', data.class, data.staticClass].join(' ')"
    :title="props.name"
    :style="`background-image: url(${props.image})`"
  />
</template>

<style>
.avatar-thumb {
  border-radius: 50%;
  background: url() center / cover no-repeat;
}
.avatar-thumb::before {
  content: "";
  display: block;
  padding-top: 100%;
}
</style>
