<template>
  <div v-editable="blok" class="wrapper">
    <div class="teaser-list">
      <StoryblokComponent
        v-for="blok in blok.columns"
        :key="blok._uid"
        :blok="blok"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>

<style scoped>
.teaser-list {
  display: grid;
  grid-gap: 20px;
  margin: 0 auto;
  max-width: 984px;
  /* Dynamically adjust columns, filling available space */
  grid-template-columns: repeat(auto-fit, minmax(231px, 1fr));
}

@media (max-width: 768px) {
  .teaser-list {
    /* Adjust to 2 columns or 1 based on size, but it's flexible */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .teaser-list {
    /* Ensure single column layout on very small screens */
    grid-template-columns: repeat(1, 1fr);
  }
}

.wrapper {
  background-color: #f9fdff;
}
</style>
