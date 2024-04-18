<template>
    <div v-editable="blok"
    class="content-wrapper"
    >
      <div class="text-and-image-container" :class="layouts">
        <div class="text-content">
          <header class="headline">{{ blok.headline }}</header>
          <div class="bodytext" v-html="bodytext"></div>
        </div>
        <div class="image-side">
            <img
            v-if="blok.image"
            :src="blok.image.filename"
            :alt="blok.image.alt"
            />
          <p class="image-caption">{{ blok.imagetext }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  const props = defineProps({ blok: Object });
  const bodytext = computed(() => renderRichText(props.blok.bodytext));

  const layouts = computed(() => {
  return props.blok.layout === "constrained" ? "text-and-image-container" : "text-and-image-container2";
});

  </script>
  
  <style scoped>
img {
  width: 100%;
}
p, .bodytext {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 64px 60px;
  background-color: #f9fdff;
}

.text-and-image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 983px;
}
.text-and-image-container2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 983px;
}

.text-content, .image-side {
  flex: 1;
  min-width: 290px; /* Ensures content does not become too narrow on small screens */
}

.text-and-image-container2 .text-content {
  order: 2; /* Places text on the right */
}

.text-and-image-container2 .image-side {
  order: 1; /* Places image on the left */
}

.headline {
  font-size: 22px;
  line-height: 123%;
  margin-bottom: 15px;
  font-weight: normal;
  font-family: Oscine, sans-serif;
  color: #0c0931;
}

.main-text {
  margin-top: 30px;
  font-size: 16px;
  line-height: 24px;
  font-family: Open Sans, sans-serif;
  color: #0c0931;
}

.featured-image {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
}

.image-caption {
  margin-top: 10px;
  font-size: 14px;
  font-family: Open Sans, sans-serif;
  color: #0c0931;
}
</style>
