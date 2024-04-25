<template>
  <div v-editable="blok" class="wrapper">
    <div class="topsection">
      <h3>{{ blok.headline }}</h3>
      <p>{{ blok.bodytext }}</p>
    </div>
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
h3 {
  padding-bottom: 30px;
}
p {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
}

.topsection {
  display: grid;
  margin: 0 auto;
  padding-left: 30px;
  max-width: 984px;
  padding-top: 30px;
}

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
  height: 400px;
  background-color: #f9fdff;
}
</style>
