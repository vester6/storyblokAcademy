<template>
  <div v-editable="blok" class="image-with-text">
    <div class="image-with-text__container" :class="layouts">
      <div class="image-with-text__text-content">
        <header class="image-with-text__headline">{{ blok.headline }}</header>
        <div class="image-with-text__bodytext" v-html="bodytext"></div>
      </div>
      <div class="image-with-text__image-side">
        <img
          v-if="blok.image"
          :src="blok.image.filename"
          :alt="blok.image.alt"
          class="image-with-text__image"
        />
        <p class="image-with-text__caption">{{ blok.imagetext }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({ blok: Object });
const bodytext = computed(() => renderRichText(props.blok.bodytext));

const layouts = computed(() => {
  return props.blok.layout === "constrained"
    ? "image-with-text__container--constrained"
    : "image-with-text__container--full";
});
</script>

<style scoped>
.image-with-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 60px;
  background-color: #f9fdff;
}

.image-with-text__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 983px;
}

.image-with-text__container--full {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 983px;
}

.image-with-text__text-content,
.image-with-text__image-side {
  flex: 1;
  min-width: 290px;
}

.image-with-text__container--full .image-with-text__text-content {
  order: 2;
}

.image-with-text__container--full .image-with-text__image-side {
  order: 1;
}

.image-with-text__headline {
  font-size: 22px;
  line-height: 123%;
  margin-bottom: 15px;
  font-weight: normal;
  font-family: Oscine, sans-serif;
  color: #0c0931;
}

.image-with-text__bodytext {
  margin-top: 30px;
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans", sans-serif;
  color: #0c0931;
  font-weight: 300;
}

.image-with-text__image {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
}

.image-with-text__caption {
  margin-top: 10px;
  font-size: 14px;
  font-family: Open Sans, sans-serif;
  color: #0c0931;
  font-weight: 300;
}
</style>
