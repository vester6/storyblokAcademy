<template>
  <div v-editable="blok" class="notice">
    <div class="notice__content">
      <img
        :src="blok.icon.filename"
        :alt="blok.icon.alt"
        class="notice__icon"
      />
      <p class="notice__text">{{ blok.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps({ blok: Object });
</script>

<style scoped>
.notice {
  background-color: #effafe;
  color: #0c0931;
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  max-width: 646px;
  margin: auto;
  padding: 30px;
}

@media (max-width: 991px) {
  .notice {
    padding: 20px 20px;
  }
}

.notice__content {
  display: flex;
  gap: 15px;
  align-items: center;
}

@media (max-width: 991px) {
  .notice__content {
    flex-direction: column;
  }
}

.notice__icon {
  align-self: start;
  object-fit: contain;
  width: 21px;
  height: 21px;
}

.notice__text {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: #0c0931;
  font-weight: 300;
}

@media (max-width: 991px) {
  .notice__text {
    max-width: 100%;
  }
}
</style>
