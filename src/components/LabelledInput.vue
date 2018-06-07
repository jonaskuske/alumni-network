<template>
  <div class="labelled-input">
    <label
      :class="[{'labelled-input__label--active': value}, {'labelled-input__label--no-transition': !transition}]"
      class="labelled-input__label"
      for="_uid"
      v-text="label"
    />
    <input
      :value="value"
      :id="_uid"
      :type="type || 'text'"
      class="labelled-input__input"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'LabelledInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Eingeben...',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  data: () => ({ transition: false }),
  created() {
    setTimeout(() => (this.transition = true), 100)
  },
}
</script>


<style>
.labelled-input {
  width: 100%;
  position: relative;
  background: #f0f0f0;
  color: #2c3e50;
}
.labelled-input__label {
  position: absolute;
  bottom: 6px;
  left: 1%;
  height: 100%;
  text-transform: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 0.6em;
  color: inherit;
  transition: transform 180ms ease-out, left 180ms ease-out, color 120ms ease-in,
    font-size 110ms 100ms ease-out;
  pointer-events: none;
}
.labelled-input__label--no-transition {
  transition: none;
}
.labelled-input__label--active {
  transform: translateY(-99%);
  left: 0;
  height: 100%;
  font-size: 0.5em;
  font-weight: 200;
}
.labelled-input__input {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 0 0 1%;
  border: none;
  background: none;
  outline: none;
  text-transform: inherit;
  box-sizing: border-box;
  text-overflow: ellipsis;
}
</style>
