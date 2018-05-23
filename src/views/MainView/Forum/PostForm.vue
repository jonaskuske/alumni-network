<template>
  <div class="create-post__form">
    <div class="create-post__inputs">
      <labelled-input
        @input="updateTitle"
        :value="value.title"
        label="Titel eingeben"
        class="input-main create-post__title"
      />
      <textarea
        @input="update"
        ref="content"
        :value="value.content"
        class="textarea-main create-post__content"
        placeholder="Beschreibung - HTML Formatierung unterstützt"
      />
    </div>
    <div class="create-post__controls">
      <div class="create-post__usergroup-wrapper">
        <label for="sel-usergroup">Zielgruppe</label>
        <select @input="update" :value="value.usergroup" ref="usergroup" id="sel-usergroup">
          <option disabled v-text="'Eine der Optionen auswählen...'" />
          <option value="Alumni" v-text="'Alumni'" />
          <option value="Studierende" v-text="'Studierende'" />
          <option value="Alle" v-text="'Alle'" />
        </select>
        <p class="create-post__gallery-label">Bilder hinzufügen</p>
      </div>
      <div class="create-post__gallery">
        <gallery-thumbnail
          class="create-post__thumbnail"
          v-for="(image, i) in thumbnails"
          :image="image"
          :key="i"
          :clickable="true"
          :style="{backgroundColor: `rgba(240,240,240,${1-0.17*i})`}"
          @click="image ? removeFromGallery(i) : $refs.galleryInput.click()"
        />
      </div>
    </div>
    <input type="file" @change="addImages" accept="image/*" multiple class="hide" ref="galleryInput">
  </div>
</template>

<script>
import { readImagesFromInput } from "@/lib/helpers";
import LabelledInput from "@/components/LabelledInput";
import GalleryThumbnail from "@/components/GalleryThumbnail";

export default {
  name: "PostForm",
  components: { LabelledInput, GalleryThumbnail },
  props: ["value"],
  data: () => ({ title: "", gallery: [] }),
  computed: {
    thumbnails() {
      return this.value.gallery.length
        ? [...this.value.gallery, ""]
        : ["", "", "", "", ""];
    }
  },
  created() {
    this.gallery = this.value.gallery;
  },
  methods: {
    update() {
      const newValue = {
        title: this.title || this.value.title,
        content: this.$refs.content.value.replace("<br>", "\n"),
        usergroup: this.$refs.usergroup.value,
        gallery: this.gallery
      };
      this.$emit("input", newValue);
    },
    updateTitle(title) {
      this.title = title;
      this.update();
    },
    removeFromGallery(index) {
      this.gallery.splice(index, 1);
      this.update();
    },
    async addImages(evt) {
      const images = await readImagesFromInput(evt);
      Array.isArray(this.gallery)
        ? this.gallery.push(...images)
        : (this.gallery = images);
      this.$refs.galleryInput.value = "";
      this.update();
    }
  }
};
</script>

<style>
.create-post__form {
  width: 100%;
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
}
.create-post__inputs {
  flex: 7;
  width: 100%;
  padding-right: 3rem;
}
.create-post__controls {
  flex: 3;
  width: 100%;
}
.create-post__usergroup-wrapper {
  height: 4.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.create-post__user-label {
  display: block;
}
.create-post__title {
  width: 90%;
  font-size: 2rem;
  height: 2.8rem;
  margin-bottom: 2rem;
}
.create-post__content {
  width: 90%;
  min-height: 300px;
  font-size: 1.1rem;
}
.create-post__date {
  width: 20%;
  margin-bottom: 2rem;
}
.create-post__gallery-label {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-end;
  height: 1.9rem;
}
.create-post__gallery {
  width: 100%;
  display: grid;
  grid-template: auto / repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 5px;
}
.create-post__thumbnail::after {
  background-image: url(~@/assets/icons/delete.svg);
}
</style>
