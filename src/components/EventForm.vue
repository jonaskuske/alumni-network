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
        <div class="create-post__select">
          <label for="date">Datum</label>
          <input
            id="date"
            ref="date"
            :value="value.date"
            type="date"
            @input="update"
          />
        </div>
        <div class="create-post__select">
          <label for="loc">Ort</label>
          <input
            id="loc"
            ref="location"
            :value="value.location"
            type="text"
            @input="update"
          />
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
    </div>
  </div>
</template>

<script>
import LabelledInput from '@/components/LabelledInput';

export default {
  name: 'EventForm',
  components: { LabelledInput },
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data: () => ({ title: '' }),
  watch: {
    value({ title }) {
      this.title = title;
    },
  },
  created() {
    const { title } = this.value;
    this.title = title;
  },
  methods: {
    update() {
      const form = {
        title: this.title,
        content: this.$refs.content.value.replace('<br>', '\n'),
        usergroup: this.$refs.usergroup.value,
        date: this.$refs.date.value,
        location: this.$refs.location.value,
      };

      this.$emit('input', form);
    },
    updateTitle(title) {
      this.title = title;
      this.update();
    },
  },
};
</script>
