<template>
  <main class="login">
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
      <form method="post" @click.prevent class="login__form" autocomplete="off">
        <labelled-input v-model="name" label="Name" class="login__form-input" />
        <labelled-input v-model="mail" label="Email" class="login__form-input" />
        <labelled-input v-model="username" label="Nutzername" class="login__form-input" />
        <labelled-input v-model="password" label="Passwort" class="login__form-input" />
        <div class="signup__container">
          <label>
            Nutzergruppe
        <select v-model="usergroup">
          <option>Eine Option auswählen...</option>
          <option>Studierende</option>
          <option>Alumni</option>
          <option>Dozenten</option>
          <option>Gäste</option>
        </select>
          </label>
        <gallery-thumbnail class="signup__profile-picture" :clickable="true" @click="open" :image="profilePicture" :circle="true" :force="true" />
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
          <input type="file" accept="image/*" ref="profilePicture" @change="addProfilePicture" class="hide">

    </section>
  </main>
</template>

<script>
import GalleryThumbnail from "@/components/GalleryThumbnail";
import LabelledInput from "@/components/LabelledInput";
import { readImageFromInput } from "@/lib/helpers";

export default {
  name: "Signup",
  components: {
    LabelledInput,
    GalleryThumbnail
  },
  data() {
    return {
      profilePicture: "",
      username: "",
      name: "",
      mail: "",
      password: "",
      usergroup: ""
    };
  },
  methods: {
    async addProfilePicture(evt) {
      const image = await readImageFromInput(evt);
      this.profilePicture = image;
      this.$refs.profilePicture = "";
    },
    open() {
      this.$refs.profilePicture.click();
    }
  }
};
</script>


<style>
.signup__profile-picture {
  background-color: #f0f0f0 !important;
  width: 100px !important;
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
