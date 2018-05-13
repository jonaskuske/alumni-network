<template>
    <footer class="root__footer" :class="{'root__footer--footer-within': false}">
      <div class="root__footer-wrapper">
        <div class="footer__contact">
          <p>Kontakt</p>
          <p>Hochschule Bremerhaven</p>
          <p>DMP Alumni Netzwerk</p>
          <p>Eine Straße, 27568 Bremerhaven</p>
          <a href="mailto:mail@dmp-alumni.hs-bremerhaven.de">mail@dmp-alumni.hs-bremerhaven.de</a>
          <p>0741/688513</p>
        </div>
        <div class="footer__links">
          <router-link to="privacy" :class="{light: false}">Datenschutz</router-link>
          <router-link to="imprint" :class="{light: false}">Impressum</router-link>
        </div>
      </div>
  </footer>
</template>

<style>
.root__footer {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 13rem;
  line-height: 0.7rem;
  background: #f0f0f0;
  color: rgba(40, 40, 40, 0.7);
  box-sizing: border-box;
}
.root__footer-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 10px;
  box-sizing: border-box;
  height: 100%;
  width: 96%;
  max-width: calc(1880px - 4vw);
}
.footer__contact {
  margin-top: auto;
  padding-right: 1rem;
}
.footer__links {
  text-align: right;
  margin-top: auto;
  padding-bottom: 1rem;
  flex-grow: 1;
}
.root__footer a {
  color: rgba(40, 40, 40, 0.7);
  text-decoration: none;
}
.root__footer a:first-of-type {
  margin-right: 2rem;
}
@media screen and (min-width: 615px) {
  .root__footer-wrapper {
    width: 90%;
    max-width: calc(1880px - 10vw);
  }
}
@media screen and (min-width: 900px) {
  .root__footer-wrapper {
    width: 70%;
    max-width: calc(1880px - 30vw);
  }
}
@media screen and (max-width: 900px) {
  .root__footer {
    height: auto;
  }
  .footer__contact {
    display: none;
  }
}
</style>
