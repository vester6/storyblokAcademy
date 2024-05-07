<template>
  <div v-editable="blok" class="labeled-graphic">
    <div class="labeled-graphic__content">
      <h1 class="labeled-graphic__headline">{{ blok.headline }}</h1>
      <p class="labeled-graphic__bodytext">{{ blok.bodyText }}</p>
      <div class="image-container" style="position: relative">
        <img :src="blok.image.filename" alt="Labeled Graphic" />
        <div
          v-for="marker in blok.markers"
          :key="marker._uid"
          class="marker"
          :style="{
            position: 'absolute',
            left: marker.x + '%',
            top: marker.y + '%',
          }"
          @click="showPopup(marker)"
        >
          🔵
        </div>
      </div>
      <div v-if="currentMarker" class="popup" @click.self="closePopup()">
        <h3>{{ currentMarker.popupText }}</h3>
        <img :src="currentMarker.popupImage.filename" alt="Marker Detail" />
        <button @click="closePopup()">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  blok: Object,
});

const currentMarker = ref(null);

function showPopup(marker) {
  currentMarker.value = marker;
}

function closePopup() {
  currentMarker.value = null;
}
</script>

<style scoped>
.labeled-graphic__content {
  max-width: 984px;
}

.labeled-graphic__headline {
  font-size: 22px;
  margin-bottom: 20px;
}

.labeled-graphic__bodytext {
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 24px;
  color: #0c0931;
}

.marker {
  cursor: pointer;
  color: #2084c9;
  font-size: 24px;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 1000;
}
</style>
