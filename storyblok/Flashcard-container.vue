<template>
  <div v-editable="blok" class="flashcard-container">
    <div class="flashcard-container__top-section">
      <h3 class="flashcard-container__headline">{{ blok.headline }}</h3>
      <p class="flashcard-container__bodytext">{{ blok.bodytext }}</p>
    </div>
    <div class="flashcard-container__teaser-list">
      <StoryblokComponent
        v-for="blok in blok.columns"
        :key="blok._uid"
        :blok="blok"
        class="flashcard-container__storyblok-component"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({ blok: Object });
</script>

<style scoped>
.flashcard-container {
  height: 400px;
  background-color: #f9fdff;
}

.flashcard-container__top-section {
  display: grid;
  margin: 0 auto;
  padding-left: 30px;
  max-width: 984px;
  padding-top: 30px;
}

.flashcard-container__headline {
  padding-bottom: 30px;
}

.flashcard-container__bodytext {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
}

.flashcard-container__teaser-list {
  display: grid;
  grid-gap: 20px;
  margin: 0 auto;
  max-width: 984px;
  grid-template-columns: repeat(auto-fit, minmax(231px, 1fr));
}

@media (max-width: 768px) {
  .flashcard-container__teaser-list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .flashcard-container__teaser-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
