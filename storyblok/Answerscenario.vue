<template>
  <div class="answerscenario">
    <input
      type="radio"
      :id="'option' + blok._uid"
      name="quiz_option"
      :value="blok.scenarionumber"
      v-model="$parent.selectedOption"
      :disabled="$parent.submitted"
    />
    <label :for="'option' + blok._uid">{{ blok.text }}</label>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({ blok: Object });

console.log(props.blok);
</script>
<style scoped>
.answerscenario {
  margin-bottom: 1em;
  width: 100%; /* Make the element take up the whole width of its container */
  cursor: pointer; /* Change the cursor to a hand pointer when hovering over the element */
}

.answerscenario:hover {
  background-color: #effafe; /* Change the background color when hovering over the element */
}
</style>
