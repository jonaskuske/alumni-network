<template>
  <main class="login">
    <section v-if="loginSuccessful" class="signup__success">
      <h1 class="signup__success-heading">Registrierung erfolgreich</h1>
      <router-link to="/login" class="button-main signup__success-button">Zum Login</router-link>
    </section>
    <template v-else>
    <section class="login__section login__section-welcome">
      <h1 class="login__heading"><span>In fünf Schritten zur</span>Registrierung</h1>
      <p class="login__description">
Gründe warum Registrierung nötig, qualitative Inhalte, moderierte Community. Animi et fugit incidunt dignissimos fugiat distinctio omnis iusto, ea cum veniam laudantium natus libero deserunt aspernatur! Consequatur.
      </p>
      <h2 class="login__features-title">Wir benötigen</h2>
      <ul class="login__features-list">
        <li class="login__features-listitem">Nutzername, Name & Email - diese sind für andere Nutzer sichtbar</li>
        <li class="login__features-listitem">Ein Passwort - mindestens 10 Zeichen lang</li>
        <li class="login__features-listitem">Deine Nutzergruppe: Alumni, Studierende, Dozenten oder Gäste</li>
        <li class="login__features-listitem">Einen Nachweis für die Zugehörigkeit zur Nutzergruppe (außer Gäste) - Matrikelnummer, alte Studienbescheinigung o.ä.</li>
        <li class="login__features-listitem">Optional: Ein Profilbild</li>
      </ul>
    </section>
    <section class="login__section login__section-login">
      <form method="post" @submit.prevent="signup" class="login__form" autocomplete="off">
        <labelled-input
          v-model="userdata.name"
          label="Name"
          class="login__form-input"
          :class="[{'login__form-input--active': userdata.name}, {'login__form-input--danger': showLoginWarning && !userdata.name}]"
        />
        <labelled-input
          v-model="userdata.mail"
          label="Email"
          type="email"
          class="login__form-input"
          :class="[{'login__form-input--active': userdata.mail}, {'login__form-input--danger': showLoginWarning && !userdata.mail}]"
        />
        <labelled-input
          v-model="userdata.username"
          label="Nutzername"
          class="login__form-input"
          :class="[{'login__form-input--active': userdata.username}, {'login__form-input--danger': showLoginWarning && !userdata.username}]"
        />
        <labelled-input
          v-model="userdata.password"
          label="Passwort"
          type="password"
          class="login__form-input"
          :class="[{'login__form-input--active': userdata.password}, {'login__form-input--danger': showLoginWarning && !userdata.password}]"
        />
        <labelled-input
          v-model="passwordConfirm"
          label="Passwort bestätigen"
          type="password"
          class="login__form-input"
          :class="[{'login__form-input--active': passwordConfirm}, {'login__form-input--danger': (showLoginWarning && !passwordConfirm) || (passwordConfirm && !passwordValid)}]"
        />
        <div class="signup__container">
          <label>
            Nutzergruppe
          <select v-model="userdata.usergroup" :class="{'login__form-input--danger':showLoginWarning && !userdata.usergroup}">
            <option value="" disabled>Eine Option auswählen...</option>
            <option value="Studierende">Studierende</option>
            <option value="Alumni">Alumni</option>
            <option value="Dozenten">Dozenten</option>
            <option value="Gäste">Gäste</option>
          </select>
            </label>
          <gallery-thumbnail
            class="signup__profile-picture"
            :clickable="true"
            @click="userdata.profilePicture ? (userdata.profilePicture = '') : $refs.picture.click()"
            :image="userdata.profilePicture"
            :circle="true"
            :force="true"
          />
        </div>
        <div class="login__action-container">
          <button
            type="submit"
            class="button-main login__button"
            :class="{'button--danger': redLoginButton}"
            :disabled="isDisabled"
            @mouseenter.once="showLoginWarning = true"
            @touchstart.once="showLoginWarning = true"
          >
            Absenden
          </button>
          <router-link to="/login/signup" class="login__link">Hilfe-Center</router-link>
          </div>
      </form>
          <input type="file" accept="image/*" ref="picture" @change="addProfilePicture" class="hide">
    </section>
    </template>
  </main>
</template>

<script>
  import { wait } from "@/lib/helpers";
  import { mapActions } from "vuex";
  import GalleryThumbnail from "@/components/GalleryThumbnail";
  import LabelledInput from "@/components/LabelledInput";
  import { readImageFromInput } from "@/lib/helpers";
  import { REGISTER_NEW_USER } from "@/store/modules/user/types";

  export default {
    name: "Signup",
    components: {
      LabelledInput,
      GalleryThumbnail
    },
    data() {
      return {
        userdata: {
          profilePicture: "",
          username: "",
          name: "",
          mail: "",
          password: "",
          usergroup: ""
        },
        passwordConfirm: "",
        loginSuccessful: false,
        redLoginButton: false,
        allowWarn: false,
        showLoginWarning: false
      };
    },
    computed: {
      passwordValid() {
        return this.userdata.password === this.passwordConfirm;
      },
      isDisabled() {
        const { name, password, username, mail, usergroup } = this.userdata;
        return (
          this.showLoginWarning &&
          (!name ||
            !username ||
            !password ||
            !mail ||
            !usergroup ||
            !this.passwordValid)
        );
      }
    },
    methods: {
      ...mapActions("userStore", { registerNewUser: REGISTER_NEW_USER }),
      async addProfilePicture(evt) {
        const image = await readImageFromInput(evt);
        this.userdata.profilePicture = image;
        this.$refs.profilePicture = "";
      },
      signup() {
        if (!this.passwordValid) return this.enableLoginWarning();
        this.registerNewUser(this.userdata)
          .then(() => (this.loginSuccessful = true))
          .catch(this.enableLoginWarning);
      },
      async enableLoginWarning() {
        this.redLoginButton = true;
        await wait(200);
        this.redLoginButton = false;
      }
    }
  };
</script>


<style>
  .signup__success {
    width: 100%;
    text-align: center;
    color: #f0f0f0;
  }
  .signup__success-heading {
    margin-bottom: 4rem;
  }
  .signup__success-button {
    text-decoration: none;
  }
  .signup__profile-picture {
    background-color: #f0f0f0 !important;
    width: 100px !important;
  }
  .signup__profile-picture::after {
    background-image: url(~@/assets/icons/delete.svg);
  }
  .signup__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
  }
  .signup__container > select {
    height: 100%;
  }
</style>
