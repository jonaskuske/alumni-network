<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__contact">
        <p>Kontakt</p>
        <p>Jonas Kuske</p>
        <p>(DMP Alumni Netzwerk)</p>
        <p>Sielstraße 5, 27568 Bremerhaven</p>
        <a href="mailto:mail@jonaskuske.com">mail@jonaskuske.com</a>
        <p>0160/3336948</p>
      </div>
      <div class="footer__links">
        <router-link to="/privacy">Datenschutz</router-link>
        <router-link to="/imprint">Impressum</router-link>
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
  padding: 1rem 0 0.5rem 0;
  box-sizing: border-box;
  height: 100%;
  width: 90%;
  margin: 0 auto;
}
.footer__links,
.footer__contact {
  margin-top: auto;
  box-sizing: border-box;
}
.footer__links {
  text-align: right;
  flex-grow: 1;
}
.footer p {
  line-height: 0.75rem;
}
.footer p:last-child {
  margin-bottom: 0;
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
    padding: 1rem 0;
  }
}
@media screen and (min-width: 1620px) {
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
    height: 4rem;
  }
  .footer__contact {
    display: none;
  }
}
</style>
