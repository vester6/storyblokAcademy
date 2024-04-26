<template>
  <div class="numbered-divider">
    <div v-editable="blok" class="numbered-divider__container">
      <div class="numbered-divider__circle">
        <p class="numbered-divider__number">{{ blok.number }}</p>
      </div>
      <div class="numbered-divider__divider"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps({ blok: Object });
</script>

<style scoped>
.numbered-divider {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 10vh; /* Full viewport height */
}

.numbered-divider__container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 984px;
  width: 100%; /* Ensure it takes the available space */
}

.numbered-divider__circle {
  position: absolute; /* Position it over the divider */
  top: 50%; /* Center vertically */
  transform: translateY(
    -50%
  ); /* Offset the height of the circle for true centering */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e2f5fc;
  z-index: 1; /* Ensures it sits above the divider */
}

.numbered-divider__number {
  /* Center the number both vertically and horizontally */
  display: flex;
  align-items: center;
  font-family: "Open Sans";
  font-weight: 500;
  justify-content: center;
  margin: 0; /* Reset margin to remove any default spacing */
  height: 100%; /* Ensure the number takes up the full height of the circle */
}

.numbered-divider__divider {
  position: absolute;
  width: 100%; /* Full width of the container */
  top: 50%; /* Align with the middle of the circle */
  border-top: 1px solid #e2f5fc; /* 1px thick, color as specified */
}
</style>
