<template functional>
  <header class="title-bar">
    <div class="title-bar__text">
      <p class="title-label title-bar__label">{{ props.label }}</p>
      <h1 class="title title-bar__title">{{ props.title }}</h1>
    </div>
    <div class="title-bar__action">
      <slot />
    </div>
  </header>
</template>

<style>
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
}
.title-bar__text {
  flex: 8;
}
.title-label.title-bar__label,
.title.title-bar__title {
  padding: 0;
}
.title-bar__action {
  align-self: flex-end;
  padding: 2px 0;
}
</style>
