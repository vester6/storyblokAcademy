<template>
  <div v-editable="question" class="question">
    <p>{{ question.text }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({ question: Object });
</script>

<style scoped>
.question {
  margin-bottom: 1em;
}
</style>
