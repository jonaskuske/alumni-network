<template>
  <main class="login">
    <section class="login__section login__section-welcome">
      <h1 class="login__heading">
        <span>Willkommen im offiziellen</span> DMP Alumni Netzwerk!
      </h1>
      <p class="login__description">
        Ein sicheres Informations- und Angebotsnetzwerk für Dozenten, Studenten,
        Studieninteressierte und Alumnis des Studiengangs Digitale
        Medienproduktion an der Hochschule Bremerhaven.
      </p>
      <h2 class="login__features-title">
        Melde dich an, um schnell und bequem
      </h2>
      <ul class="login__features-list">
        <li class="login__features-listitem">
          mit Studierenden, Alumni und Dozenten zu kommunizieren
        </li>
        <li class="login__features-listitem">
          Events zu planen und dein Netzwerk zu erweitern
        </li>
        <li class="login__features-listitem">
          auf der internen Jobbörse das perfekte Angebot zu finden
        </li>
      </ul>
    </section>
    <section class="login__section login__section-login">
      <form
        method="post"
        autocomplete="off"
        class="login__form"
        @submit.prevent="login"
      >
        <labelled-input
          v-model="userInput"
          :label="userInputLabel"
          :class="[
            { 'login__form-input--active': userInput },
            { 'login__form-input--danger': showLoginWarning },
          ]"
          class="login__form-input"
        />
        <labelled-input
          v-model="passwordInput"
          :label="passwordInputLabel"
          :class="[
            { 'login__form-input--active': passwordInput },
            { 'login__form-input--danger': showLoginWarning },
          ]"
          type="password"
          class="login__form-input"
        />
        <div class="login__action-container">
          <button
            :class="{ 'button--danger': redLoginButton }"
            :disabled="isFormDisabled"
            type="submit"
            class="button-main login__button"
            @mouseenter.once="allowFormWarnings = true"
            @touchstart.once="allowFormWarnings = true"
          >
            Login
          </button>
          <router-link to="/login/signup" class="login__link">
            oder registrieren
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import * as auth from '@/lib/auth';
import LabelledInput from '@/components/LabelledInput';
import { wait } from '@/lib/helpers';

export default {
  name: 'Login',
  components: { LabelledInput },
  data() {
    return {
      userInput: '',
      passwordInput: '',
      allowFormWarnings: false,
      showLoginWarning: false,
      redLoginButton: false,
    };
  },
  computed: {
    isFormDisabled() {
      return this.allowFormWarnings
        ? !this.userInput || !this.passwordInput
        : false;
    },
    userInputLabel() {
      return this.userInput || !this.allowFormWarnings
        ? 'Nutzername'
        : 'Bitte Nutzername eingeben!';
    },
    passwordInputLabel() {
      return this.passwordInput || !this.allowFormWarnings
        ? 'Passwort'
        : 'Bitte Passwort eingeben!';
    },
  },
  methods: {
    login() {
      const success = auth.login(this.userInput, this.passwordInput);

      if (success) {
        this.$router.push(this.$route.query.redirect || '/');
      } else this.enableLoginWarning();
    },
    async enableLoginWarning() {
      this.showLoginWarning = true;
      this.redLoginButton = true;
      await wait(200);
      this.redLoginButton = false;
    },
  },
};
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login__section {
  width: 100%;
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  max-width: 30rem;
}
.login__section-welcome {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.login__section-login {
  margin-top: 5%;
  flex-grow: 3;
}
.login__heading {
  font-size: 1.6rem;
}
.login__heading > span {
  font-size: 0.75em;
  font-weight: normal;
  width: 100%;
  display: inline-block;
}
.login__description {
  display: none;
}
.login__features-title {
  font-size: 1rem;
  font-weight: 500;
  margin: 5% 0 0.5rem 0;
}
.login__features-list {
  padding-left: 1.7rem;
  margin-bottom: 0;
}
.login__form {
  width: 100%;
}
.login__form-input,
.login__button {
  height: 2rem;
}
.login__form-input {
  font-size: 1.45rem;
  margin: 1.5rem 0;
  box-sizing: border-box;
}
.login__form-input--active {
  color: #f0f0f0;
}
.login__form-input--danger {
  border: 3px solid rgba(255, 0, 0, 0.7);
  border-radius: 5px;
}
.login__action-container {
  display: flex;
  justify-content: space-between;
}
.login__button {
  width: 100%;
  max-width: 180px;
  box-sizing: border-box;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 1rem;
  margin-right: 1rem;
}
.login__button:disabled,
.login__button:disabled:hover {
  background: red;
  cursor: not-allowed;
}
.login__link {
  width: 100%;
  text-align: right;
  height: 100%;
  align-self: flex-end;
  color: #f0f0f0;
  font-size: 1rem;
}
@media screen and (min-width: 900px) {
  .login {
    flex-direction: row;
    justify-content: space-between;
  }
  .login__section {
    max-width: 100%;
  }
  .login__section-welcome {
    flex-shrink: 1;
  }
  .login__section-login {
    flex-shrink: 1.5;
    margin-left: 10%;
  }
  .login__heading {
    font-size: 2.2rem;
  }
  .login__description {
    display: block;
  }
  .login__features-title {
    font-size: 1.1rem;
  }
  .login__link {
    width: auto;
    flex-shrink: 0;
  }
}
@media screen and (min-width: 1500px) {
  .login__action-container {
    justify-content: flex-start;
  }
}
@media screen and (min-width: 1550px) {
  .login__heading {
    font-size: 2.4rem;
  }
  .login__form-input,
  .login__button {
    height: 2.4rem;
  }
}
</style>
