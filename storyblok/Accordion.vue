<template>
  <div v-editable="accordion" class="accordion">
    <div class="accordion__header" @click="toggleAccordion">
      <h3 class="accordion__headline">{{ accordion.headline }}</h3>
      <span class="accordion__icon">{{ isExpanded ? "-" : "+" }}</span>
    </div>
    <div
      class="accordion__content"
      :style="{ display: isExpanded ? 'block' : 'none' }"
    >
      <img
        v-if="accordion.image"
        :src="accordion.image.filename"
        :alt="accordion.image.alt"
        class="accordion__image"
      />

      <div class="accordion__bodytext" v-html="bodytextnewcontent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({ accordion: Object });
const bodytextnewcontent = computed(() =>
  renderRichText(props.accordion.bodytextnew)
);

const isExpanded = ref(false);

const toggleAccordion = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.accordion {
  border-bottom: 1px solid #e1e1e1;
  transition: background-color 1s ease;
}

.accordion:last-child {
  border-bottom: none;
}

.accordion__header {
  padding: 30px 30px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 1s ease;
}

.accordion__header:hover {
  background-color: #e2f5fc;
}

.accordion__icon {
  font-size: 24px;
  line-height: 0;
}

.accordion__content {
  padding: 20px;
  background-color: white;
  transition: all 1s ease-in-out;
}

.accordion__image {
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.accordion__bodytext {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
}

.accordion__bodytext {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
}
</style>
