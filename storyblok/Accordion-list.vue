<template>
  <div v-editable="blok" class="accordion-list">
    <Accordion
      v-for="accordion in blok.accordions"
      :key="accordion._uid"
      :accordion="accordion"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({ blok: Object });
</script>

<style scoped>
p {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
}

.accordion-list {
  max-width: 984px;
  margin: 20px auto;
  border: 1px solid #ced4da; /* Adds a light border around the whole list */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
