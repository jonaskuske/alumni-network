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
        <div class="create-post__select">
          <label for="date">Datum</label>
          <input type="date" :value="value.date" @input="update" ref="date" id="date">
        </div>
        <div class="create-post__select">
          <label for="loc">Ort</label>
          <input type="text" :value="value.location" @input="update" ref="location" id="loc">
        </div>
        <div class="create-post__select">
          <label for="sel-usergroup">Zielgruppe</label>
          <select @input="update" :value="value.usergroup" ref="usergroup" id="sel-usergroup">
            <option disabled value="" v-text="'Eine der Optionen auswählen...'" />
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
  import { mapGetters } from "vuex";
  import LabelledInput from "@/components/LabelledInput";

  export default {
    name: "EventForm",
    components: { LabelledInput },
    props: ["value"],
    data: () => ({ title: "" }),
    created() {
      const { title } = this.value;
      this.title = title;
    },
    watch: {
      value({ title }) {
        this.title = title;
      }
    },
    methods: {
      update() {
        const form = {
          title: this.title,
          content: this.$refs.content.value.replace("<br>", "\n"),
          usergroup: this.$refs.usergroup.value,
          date: this.$refs.date.value,
          location: this.$refs.location.value
        };

        this.$emit("input", form);
      },
      updateTitle(title) {
        this.title = title;
        this.update();
      }
    }
  };
</script>