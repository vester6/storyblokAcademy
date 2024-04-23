<template>
  <div :class="{ answer: true, selected: selected }">
    <p>{{ answer.text }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({ answer: Object, selected: Boolean });
</script>

<style scoped>
.answer {
  margin-bottom: 1em;
  width: 100%; /* Make the element take up the whole width of its container */
  cursor: pointer; /* Change the cursor to a hand pointer when hovering over the element */
}

.answer:hover {
  background-color: #effafe; /* Change the background color when hovering over the element */
}

.answer.selected {
  border: 3px solid #2084c9; /* Change the color as per your requirement */
  box-sizing: border-box;
}
</style>
