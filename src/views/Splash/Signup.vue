<template>
  <main class="login">
    <section v-if="loginSuccessful" class="signup__success">
      <h1 class="signup__success-heading">Registrierung erfolgreich</h1>
      <router-link to="/login" class="button-main signup__success-button">Zum Login</router-link>
    </section>
    <template v-else>
    <section class="login__section login__section-welcome">
      <h1 class="login__heading"><span>Nur vier Schritte bis zur</span>Registrierung</h1>
      <p class="login__description">
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam ab accusamus dolor animi et fugit incidunt dignissimos fugiat distinctio omnis iusto, ea cum veniam laudantium natus libero deserunt aspernatur! Consequatur.
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
        <labelled-input v-model="userdata.name" label="Name" class="login__form-input" />
        <labelled-input v-model="userdata.mail" label="Email" class="login__form-input" />
        <labelled-input v-model="userdata.username" label="Nutzername" class="login__form-input" />
        <labelled-input v-model="userdata.password" label="Passwort" class="login__form-input" />
        <div class="signup__container">
          <label>
            Nutzergruppe
          <select v-model="userdata.usergroup">
            <option disabled>Eine Option auswählen...</option>
            <option>Studierende</option>
            <option>Alumni</option>
            <option>Dozenten</option>
            <option>Gäste</option>
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
        loginSuccessful: false
      };
    },
    methods: {
      ...mapActions("userStore", { registerNewUser: REGISTER_NEW_USER }),
      async addProfilePicture(evt) {
        const image = await readImageFromInput(evt);
        this.userdata.profilePicture = image;
        this.$refs.profilePicture = "";
      },
      signup() {
        this.registerNewUser(this.userdata).then(
          () => (this.loginSuccessful = true)
        );
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
