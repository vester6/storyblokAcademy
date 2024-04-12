<template>
  <div v-editable="accordion" class="accordion">
    <div class="accordion-header" @click="toggleAccordion">
      <h3>{{ accordion.headline }}</h3>
      <span class="accordion-icon">{{ isExpanded ? "-" : "+" }}</span>
    </div>
    <div
      class="accordion-content"
      :style="{ display: isExpanded ? 'block' : 'none' }"
    >
      <img
        v-if="accordion.image"
        :src="accordion.image.filename"
        :alt="accordion.image.alt"
      />
      <p>{{ accordion.bodytext }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
defineProps({ accordion: Object });

const isExpanded = ref(false);

const toggleAccordion = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.accordion {
  border-bottom: 1px solid #e1e1e1;
  transition: background-color 0.3s ease;
}

.accordion:last-child {
  border-bottom: none;
}

.accordion-header {
  padding: 30px 30px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.accordion-header:hover {
  background-color: #e2f5fc;
}

.accordion-icon {
  font-size: 24px;
  line-height: 0; /* Adjusts line height to match the icon size */
}

.accordion-content {
  padding: 20px;
  background-color: white;
  transition: all 0.3s ease-in-out;
}

.accordion-content img {
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.accordion-content p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
}
</style>
