<template>
  <div v-editable="blok" class="grid-card">
    <div class="grid-card__content">
      <img
        :src="blok.image.filename"
        :alt="blok.image.alt"
        class="grid-card__image"
      />
      <h3 class="grid-card__name">
        {{ blok.name }}
      </h3>
      <p class="grid-card__bodytext">
        {{ blok.bodytext }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps({ blok: Object });
</script>

<style scoped>
.grid-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 15px;
}

.grid-card__image {
  width: 100%;
  min-height: 235px;
  object-fit: cover;
  max-width: 500px;
  margin-bottom: 20px;
}

.grid-card__name {
  margin-top: 0;
  margin-bottom: 10px;
}

.grid-card__bodytext {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
  margin-top: 0;
}
</style>
