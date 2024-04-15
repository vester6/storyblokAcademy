<template>
  <div v-editable="blok" class="container">
    <div class="content">
      <img :src="blok.icon.filename" :alt="blok.icon.alt" class="icon" />
      <p class="text">{{ blok.text }}</p>
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
.container {
  background-color: #effafe;
  color: #0c0931;
  display: flex;
  flex-direction: column;
  align-items: left; /* Ensure the container is centered */
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  max-width: 646px;
  margin: auto; /* Centering in the viewport */
  padding: 30px;
  /* Take full viewport height */
}

@media (max-width: 991px) {
  .container {
    padding: 20px 20px;
  }
}

.content {
  display: flex;
  gap: 15px;
  align-items: center; /* Align items vertically */
}

@media (max-width: 991px) {
  .content {
    flex-direction: column;
  }
}

.icon {
  align-self: start;
  object-fit: contain;
  width: 21px;
  height: 21px; /* Match the width if aspect ratio is to be maintained */
}

.text {
  font-family: "Open Sans", sans-serif;
}

@media (max-width: 991px) {
  .text {
    max-width: 100%;
  }
}
</style>
