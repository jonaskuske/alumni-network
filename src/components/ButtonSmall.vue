<template>
  <button
    type="button"
    @click="$event.target.blur(); $emit('click', $event)"
    :class="['comp-button-small', {'comp-button-small--attr': value}]"
    :data-attr="value ? value : false"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: false
    }
  }
};
</script>


<style>
.comp-button-small {
  margin: 0;
  padding: 0;
  border: none;
  background: none center / 70% no-repeat;
  cursor: pointer;
  border-radius: 50%;
  outline: none;
  width: 100%;
}
.comp-button-small:hover,
.comp-button-small:focus {
  background-color: #9c9c9c;
}
.comp-button-small::before {
  content: "";
  display: block;
  padding-top: 100%;
}
.comp-button-small--attr {
  position: relative;
  box-sizing: border-box;
  margin-right: 1rem;
}
.comp-button-small--attr::after {
  content: attr(data-attr);
  right: 0;
  top: 50%;
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 600;
  transform: translateY(-50%) translateX(95%);
  position: absolute;
}
</style>
