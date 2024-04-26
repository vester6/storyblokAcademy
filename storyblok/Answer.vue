<template>
  <div :class="{ 'answer-card': true, 'answer-card--selected': selected }">
    <p class="answer-card__text">{{ answer.text }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps({ answer: Object, selected: Boolean });
</script>

<style scoped>
.answer-card {
  margin-bottom: 1em;
  width: 100%;
  cursor: pointer;
}

.answer-card:hover {
  background-color: #effafe;
}

.answer-card--selected {
  border: 3px solid #2084c9;
  box-sizing: border-box;
}
</style>
