<template>
  <div class="create-post__form">
    <div class="create-post__inputs">
      <labelled-input
        :value="value.title"
        label="Titel eingeben"
        class="input-main create-post__title"
        @input="updateTitle"
      />
      <textarea
        ref="content"
        :value="value.content"
        class="textarea-main create-post__content"
        placeholder="Beschreibung - HTML Formatierung unterstützt"
        @input="update"
      />
    </div>
    <div class="create-post__controls">
      <div class="create-post__usergroup-wrapper">
        <div
          v-show="typeof value.subforum === 'string'"
          class="create-post__select create-post__subforum"
        >
          <label for="sel-subforum">Unterforum</label>
          <select
            id="sel-subforum"
            ref="subforum"
            :value="value.subforum"
            @input="update"
          >
            <option
              disabled
              value=""
              v-text="'Eine der Optionen auswählen...'"
            />
            <option
              v-for="(subforum, i) in subforumNames"
              :key="i"
              :value="subforum"
              v-text="subforum"
            />
          </select>
        </div>
        <div class="create-post__select">
          <label for="sel-usergroup">Zielgruppe</label>
          <select
            id="sel-usergroup"
            ref="usergroup"
            :value="value.usergroup"
            @input="update"
          >
            <option
              disabled
              value=""
              v-text="'Eine der Optionen auswählen...'"
            />
            <option value="Alumni" v-text="'Alumni'" />
            <option value="Studierende" v-text="'Studierende'" />
            <option value="Alle" v-text="'Alle'" />
          </select>
        </div>
      </div>
      <div class="create-post__gallery">
        <p class="create-post__gallery-label">Bilder hinzufügen</p>
        <gallery-thumbnail
          v-for="(image, i) in thumbnails"
          :image="image"
          :key="i"
          :clickable="true"
          :style="{ backgroundColor: `rgba(240,240,240,${1 - 0.17 * i})` }"
          class="create-post__thumbnail"
          @click="image ? removeFromGallery(i) : $refs.galleryInput.click()"
        />
      </div>
    </div>
    <input
      ref="galleryInput"
      type="file"
      accept="image/*"
      multiple
      class="hide test-test"
      @change="addImages"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { readImagesFromInput } from '@/lib/helpers';
import LabelledInput from '@/components/LabelledInput';
import GalleryThumbnail from '@/components/GalleryThumbnail';

export default {
  name: 'PostForm',
  components: { LabelledInput, GalleryThumbnail },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data: () => ({ title: '', gallery: [] }),
  computed: {
    ...mapGetters('forumStore', ['subforumNames']),
    thumbnails() {
      /* Gallery empty? Show 5 empty thumbnails 'add image' */
      return this.value.gallery.length
        ? [...this.value.gallery, '']
        : ['', '', '', '', ''];
    },
  },
  watch: {
    value({ gallery, title }) {
      this.gallery = gallery;
      this.title = title;
    },
  },
  created() {
    const { gallery, title } = this.value;
    /* Create gallery copy to avoid mutating the props array */
    this.gallery = [...gallery];
    this.title = title;
  },
  methods: {
    update() {
      const subforum = this.$refs.subforum.value;
      const form = {
        title: this.title,
        content: this.$refs.content.value.replace('<br>', '\n'),
        usergroup: this.$refs.usergroup.value,
        gallery: this.gallery,
      };
      if (typeof subforum === 'string' && subforum) form.subforum = subforum;

      this.$emit('input', form);
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
      this.$refs.galleryInput.value = '';
      this.update();
    },
  },
};
</script>

<style>
.create-post__form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1rem 0 0 -4rem;
}
.create-post__inputs {
  flex-basis: 52%;
  flex-shrink: 0;
  flex-grow: 2;
  margin-top: 2rem;
  margin-left: 4rem;
  display: flex;
  flex-direction: column;
}
.create-post__controls {
  margin-top: 2rem;
  margin-left: 4rem;
  flex-grow: 2;
}
.create-post__select {
  height: 2.8rem;
  margin-bottom: 2rem;
  position: relative;
}
.create-post__select:first-child {
  display: flex;
  align-items: flex-end;
}
.create-post__select:first-child > label {
  top: 46%;
}
.create-post__select > * {
  width: 100%;
}
.create-post__select > label {
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  margin: 0;
  padding: 0;
}
.create-post__title {
  font-size: 1.4rem;
  height: 2.8rem;
  margin-bottom: 2rem;
}
.create-post__content {
  min-height: 200px;
  max-height: 400px;
  flex-grow: 1;
  font-size: 1.1rem;
}
.create-post__gallery-label {
  position: absolute;
  top: 0;
  transform: translateY(-105%);
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-end;
}
.create-post__gallery {
  /* autoprefixer: off */
  position: relative;
  width: 100%;
  display: grid;
  grid-template: auto / repeat(auto-fill, minmax(85px, 1fr));
  grid-gap: 5px;
}
.create-post__thumbnail::after {
  background-image: url(~@/assets/icons/delete.svg);
}
@media screen and (min-width: 1200px) {
  .create-post__title {
    font-size: 2rem;
  }
}
</style>
