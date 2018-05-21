<template>
  <main class="signup__main">
    <section class="signup__section">
      <h1 class="signup__heading"><span>Nur drei Schritte bis zur</span>Registrierung</h1>
    </section>
  </main>
</template>

<style>
.signup__main {
  display: grid;
  min-height: calc(100vh - 13rem);
  grid-template: 1fr 1fr 4fr / 17.5% 1fr 17.5%;
}
.signup__section {
  grid-column: 2;
  grid-row: 2;
}
.signup__heading {
  font-size: 3.6rem;
  margin: 0;
  line-height: 2.9rem;
}
.signup__heading > span {
  font-size: 1.7rem;
  font-weight: normal;
  width: 100%;
  display: inline-block;
}
</style>
