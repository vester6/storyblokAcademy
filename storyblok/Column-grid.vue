<template>
  <div v-editable="blok" class="column-grid">
    <div class="column-grid__top-section">
      <h3 class="column-grid__headline">{{ blok.headline }}</h3>
      <p class="column-grid__bodytext">{{ blok.bodytext }}</p>
    </div>
    <div class="column-grid__teaser-list">
      <StoryblokComponent
        v-for="blok in blok.columns"
        :key="blok._uid"
        :blok="blok"
        class="column-grid__storyblok-component"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({ blok: Object });
</script>

<style scoped>
.column-grid {
  background-color: #f9fdff;
}

.column-grid__top-section {
  display: grid;
  margin: 0 auto;
  padding-left: 30px;
  max-width: 984px;
  padding-top: 30px;
}

.column-grid__headline {
  padding-bottom: 30px;
}

.column-grid__bodytext {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
}

.column-grid__teaser-list {
  display: grid;
  grid-gap: 20px;
  margin: 0 auto;
  max-width: 984px;
  grid-template-columns: repeat(auto-fit, minmax(231px, 1fr));
}

@media (max-width: 768px) {
  .column-grid__teaser-list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .column-grid__teaser-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
