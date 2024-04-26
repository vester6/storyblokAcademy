<template>
  <div class="image-with-text" :class="gradients">
    <div class="image-with-text__text-container" :class="layouts">
      <div class="image-with-text__bodytext" v-html="bodytext"></div>
    </div>
    <img
      class="image-with-text__image"
      v-if="blok.image"
      :src="blok.image.filename"
      :alt="blok.image.alt"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({ blok: Object });
const bodytext = computed(() => renderRichText(props.blok.bodytext));

const layouts = computed(() => {
  return props.blok.layout === "constrained"
    ? "image-with-text__text-container--constrained"
    : "image-with-text__text-container--full";
});
const gradients = computed(() => {
  return props.blok.layout === "constrained"
    ? "image-with-text--gradient-constrained"
    : "image-with-text--gradient-full";
});
</script>

<style scoped>
.image-with-text__text-container--constrained {
  display: flex;
  justify-content: left;
  margin: auto;
  width: 984px;
}

.image-with-text__text-container--full {
  display: flex;
  justify-content: right;
  margin: auto;
  width: 984px;
}

.image-with-text__bodytext {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.75);
  max-width: 492px;
}

.image-with-text--gradient-constrained {
  display: flex;
  position: relative;
  overflow: hidden;
  min-height: 450px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: Oscine, sans-serif;
  font-size: 22px;
  color: #0c0931;
  font-weight: 300;
  line-height: 27px;
  background: rgb(245, 251, 255);
  background: linear-gradient(
    90deg,
    rgba(245, 251, 255, 0.95) 20%,
    rgba(245, 251, 255, 0.8) 63%,
    rgba(245, 251, 255, 0) 100%
  );
}

.image-with-text--gradient-full {
  display: flex;
  position: relative;
  overflow: hidden;
  min-height: 450px;
  width: 100%;
  font-family: Oscine, sans-serif;
  font-size: 22px;
  color: #0c0931;
  font-weight: 300;
  line-height: 27px;
  background: rgb(245, 251, 255);
  background: linear-gradient(
    270deg,
    rgba(245, 251, 255, 0.95) 20%,
    rgba(245, 251, 255, 0.8) 63%,
    rgba(245, 251, 255, 0) 100%
  );
}

@media (max-width: 991px) {
  .image-with-text {
    padding: 0 60px; /* Adjusted padding */
  }
}

.image-with-text__image {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
