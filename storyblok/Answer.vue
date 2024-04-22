<template>
  <div class="answer">
    <p>{{ answer.text }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({ answer: Object });
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
</style>
