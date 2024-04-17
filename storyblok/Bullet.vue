<template>
  <div>
    <div v-editable="bullet" class="container">
      <div class="circle">
        <p class="number">{{ bullet.number }}</p>
      </div>
      <div class="bulletcontent" v-html="bulletcontent"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({ bullet: Object });
const bulletcontent = computed(() => renderRichText(props.bullet.bullettext));
</script>

<style scoped>
.container {
  display: flex;
  margin-bottom: 30px;
}

.bulletcontent {
  margin-top: 4px;
}

.number {
  /* Center the number both vertically and horizontally */
  display: flex;
  align-items: center;
  font-family: "Open Sans";
  font-weight: 500;
  justify-content: center;
  margin: 0;
  height: 100%; /* Ensure the number takes up the full height of the circle */
}

.circle {
  width: 30px; /* You can adjust this value as needed */
  height: 30px; /* Same value as width to maintain a perfect circle */
  min-width: 30px; /* Ensure a minimum width */
  min-height: 30px; /* Ensure a minimum height */
  border-radius: 50%;
  background-color: #e2f5fc;
  margin-right: 15px;
}
</style>
