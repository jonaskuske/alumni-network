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
    flex-wrap: wrap-reverse;
    padding: 1rem 0;
  }
  .title-label.title-bar__label,
  .title.title-bar__title {
    padding: 0;
  }
  .title-bar__text {
    margin: 0.5rem 0 0 0;
  }
  .title-bar__action {
    align-self: flex-start;
    padding: 2px 0;
    margin-left: auto;
  }
  .title-bar__action > * {
    margin-left: 1rem;
  }
  @media screen and (min-width: 900px) {
    .title-bar {
      padding: 2rem 0;
    }
  }
</style>
