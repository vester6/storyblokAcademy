<template>
  <div v-editable="blok" class="card-teaser">
    <div class="teaser-content">
      <img
        :src="blok.image.filename"
        :alt="blok.image.alt"
        class="teaser-image"
      />
      <h3>
        {{ blok.name }}
      </h3>
      <p>
        {{ blok.bodytext }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
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

.card-teaser {
  width: 100%; /* To fill out the content area */
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 15px;
}

.teaser-image {
  width: 100%;
  min-height: 235px;
  object-fit: cover;
  max-width: 500px; /* Adjust max-width as needed */
  margin-bottom: 20px; /* Adjust the bottom margin to control space between image and headline */
}

.teaser-content h3 {
  margin-top: 0; /* Removes the top margin from the headline */
  margin-bottom: 10px; /* Adjust the bottom margin to control space between headline and body text */
}

.teaser-content p {
  margin-top: 0; /* Removes the top margin from the paragraph, reducing space between it and the headline */
}
</style>
