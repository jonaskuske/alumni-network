<template>
    <footer class="footer">
      <div class="footer__wrapper">
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
.footer {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 13rem;
  background: #f0f0f0;
  color: rgba(40, 40, 40, 0.7);
}
.footer__wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px 0;
  box-sizing: border-box;
  height: 100%;
  width: 90%;
  margin: 0 auto;
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
.footer p {
  line-height: 0.7rem;
}
.footer a {
  color: inherit;
  text-decoration: none;
}
.footer a:first-of-type {
  margin-right: 2rem;
}
@media screen and (min-width: 900px) {
  .footer__wrapper {
    width: 80%;
  }
}
@media screen and (min-width: 1720px) {
  .footer__wrapper {
    width: 70%;
  }
}
@media screen and (min-width: 1880px) {
  .footer__wrapper {
    width: 60%;
  }
}
@media screen and (max-width: 900px) {
  .footer {
    height: auto;
  }
  .footer__contact {
    display: none;
  }
}
</style>
