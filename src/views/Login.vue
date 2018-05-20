<template>
  <main class="login">
    <section class="login__description">
      <h1 class="login__heading"><span>Willkommen im offiziellen</span> DMP Alumni Portal!</h1>
      <br>
      <template v-if="!mobileLayout">
        <p>
          Ein sicheres Informations- und Angebotsnetzwerk für Dozenten, Studenten, Studieninteressierte und Alumnis des Studiengangs Digitale Medienproduktion an der Hochschule Bremerhaven.
        </p>
        <br>
      </template>
      <p><span>Melde dich an</span>, um schnell und bequem</p>
      <ul>
        <li>mit Studierenden, Alumni und Dozenten zu kommunizieren</li>
        <li>Events zu planen und dein Netzwerk zu erweitern</li>
        <li>auf der internen Jobbörse das perfekte Angebot zu finden</li>
      </ul>
    </section>
    <section class="login__login">
      <form action="submit" autocomplete="off" class="login__form" v-autofill-catch @submit.prevent="checkLogin">
        <div class="login__form-row">
          <label for="user" class="input__label" :class="{'userinput__label-active': userInput.length}">{{ userInputLabel }}</label>
          <input autocomplete="off" type="text" id="user" v-model="userInput">
        </div>
        <div class="login__form-row">
          <label for="password" class="input__label" :class="{'userinput__label-active': passwordInput.length}">{{ passwordInputLabel }}</label>
          <input type="password" autocomplete="off" id="password" v-model="passwordInput">
        </div>
        <div class="login__form-row login__buttons">
          <button type="submit" :disabled="isDisabled" class="login__button">Login</button>
          <router-link :to="{name: 'signup'}" class="signup__link">oder registrieren</router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "login",
  data() {
    return {
      userInput: "",
      userInputLabel: "Name oder Matrikelnummer",
      passwordInput: "",
      passwordInputLabel: "Passwort",
      isDisabled: false
    };
  },
  computed: {
    ...mapState(["mobileLayout"])
  },
  methods: {
    ...mapActions(["login"]),
    checkLogin() {
      if (!this.userInput)
        this.userInputLabel = "Bitte Name oder Matrikelnummer eingeben!";
      if (!this.passwordInput)
        this.passwordInputLabel = "Bitte Passwort eingeben!";
      this.isDisabled = true;
      if (!this.userInput || !this.passwordInput) return;
      this.login();
      this.$router.push("/");
    }
  }
};
</script>


<style>
.login {
  display: grid;
  max-width: 2000px;
  grid-template: auto auto / 1rem 1fr 1rem;
}
.login__description {
  grid-row: 1;
  padding-right: 1rem;
}
.login__description p,
.login__description li {
  font-size: 0.9rem;
}
.login__description > p {
  margin: 0;
}
.login__login {
  grid-row: 2;
}
.login__description,
.login__login {
  grid-column: 2;
}
.login__heading {
  font-size: 1.8rem;
  margin: 0;
  line-height: 2rem;
}
.login__heading > span {
  font-size: 1.3rem;
  font-weight: normal;
  width: 100%;
  display: inline-block;
}
.input__label {
  position: absolute;
  bottom: 4px;
  left: 5px;
  font-size: 0.8rem;
  color: #2c3e50;
  transition: transform 180ms ease-out, color 120ms ease-in,
    font-size 110ms 100ms ease-out;
  pointer-events: none;
}
.login__form input {
  width: 100%;
  margin: 0;
  padding: 0;
  padding-left: 5px;
  box-sizing: border-box;
  height: 2rem;
  background: #f0f0f0;
  border: none;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
  font-size: 1.3rem;
}
.login__buttons {
  display: flex;
  justify-content: space-between;
}
.login__buttons a {
  color: #f0f0f0;
  align-self: flex-end;
  text-decoration: underline;
}
.login__button {
  height: 2rem;
  width: 50%;
  font-size: 1rem;
  background: rgba(17, 255, 97, 0.78);
  border: none;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.2);
  color: #f0f0f0;
  cursor: pointer;
  transition: background-color 200ms, box-shadow 200ms;
  margin-right: 2rem;
}
.login__button:hover,
.login__button:focus {
  background: rgba(17, 255, 97, 0.95);
  box-shadow: 0 0 7px 3px rgba(40, 40, 40, 0.3);
}
.login__form-row {
  margin-top: 2rem;
  position: relative;
}
.login__form-row:first-of-type {
  margin-top: 0;
}
.userinput__label-active {
  transform: translate(-5px, -2rem);
  color: #f0f0f0;
  font-size: 0.8rem;
  font-weight: 200;
}
.signup__link {
  width: 50%;
  text-align: right;
  font-size: 0.9rem;
}

@media screen and (min-width: 600px) {
  .login {
    grid-template: 1fr 1fr / 4rem 1fr 4rem;
  }
  .login__heading {
    font-size: 2.8rem;
    line-height: 2.5rem;
  }
  .login__heading > span {
    font-size: 1.5rem;
  }
  .login__description > p {
    margin: 1rem 0;
  }
  .login__form input,
  .login__button {
    height: 2.7rem;
  }
  .userinput__label-active {
    transform: translate(-5px, -2.5rem);
    font-size: 0.9rem;
  }
  .login__description p,
  .login__description li,
  .signup__link {
    font-size: 1rem;
  }
  .login__button {
    font-size: 1.2rem;
  }
}
@media screen and (min-width: 900px) {
  .login {
    grid-template: 1.5fr 1fr 4fr / 8vw 1.8fr 1fr 8vw;
    min-height: calc(100vh - 18rem);
    margin: 0 auto;
  }
  .login__login {
    grid-column: 3;
    grid-row: 3;
  }
  .login__description {
    grid-row: 2 / 4;
  }
  .login__form-row:first-of-type {
    margin-top: 2rem;
  }
  .login__button {
    width: 40%;
  }
  .signup__link {
    width: 60%;
    text-align: left;
  }
}
@media screen and (min-width: 1100px) {
  .login__heading {
    font-size: 3.6rem;
    line-height: 2.9rem;
  }
  .login__heading > span {
    font-size: 1.7rem;
  }
  .login__description p,
  .login__description li {
    font-size: 1.1rem;
  }
}
@media screen and (min-width: 1500px) {
  .login {
    grid-template: 1.5fr 1fr 4fr / 15vw 2fr 1fr 15vw;
  }
  .login__description p,
  .login__description li {
    font-size: 1.3rem;
  }
}
.login__button:disabled {
  background: red;
  cursor: not-allowed;
}
</style>
