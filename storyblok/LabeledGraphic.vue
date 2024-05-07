<template>
  <div v-editable="blok" class="labeled-graphic" @click="closePopup()">
    <h2 class="labeled-graphic__headline">{{ blok.headline }}</h2>
    <p class="labeled-graphic__bodytext">{{ blok.bodyText }}</p>
    <div class="image-container">
      <img
        :src="blok.image.filename"
        alt="Labeled Graphic"
        class="labeled-graphic__image"
      />
      <div
        v-for="marker in blok.markers"
        :key="marker._uid"
        class="marker"
        :style="{ left: marker.x + '%', top: marker.y + '%' }"
        @click.stop="showPopup(marker, $event)"
      >
        <div class="marker-icon">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.44 5.005H6.82V1.4C6.82 0.905 6.415 0.5 5.92 0.5C5.425 0.5 5.02 0.905 5.02 1.4V5.02H1.4C0.905 5.02 0.5 5.425 0.5 5.92C0.5 6.415 0.905 6.82 1.4 6.82H5.02V10.44C5.02 10.935 5.425 11.34 5.92 11.34C6.415 11.34 6.82 10.935 6.82 10.44V6.805H10.44C10.935 6.805 11.34 6.4 11.34 5.905C11.34 5.41 10.935 5.005 10.44 5.005Z"
              fill="white"
            />
          </svg>
          <div class="pulse"></div>
        </div>
      </div>
    </div>
    <div v-if="currentMarker" class="popup" :style="popupStyle">
      <img
        :src="currentMarker.popupImage.filename"
        class="popupimage"
        alt="Marker Detail"
      />
      <h3>{{ currentMarker.popupText }}</h3>
      <p class="bodytextpopup">{{ currentMarker.popupbodytext }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  blok: Object,
});
const currentMarker = ref(null);
const popupStyle = ref({});

function showPopup(marker, event) {
  currentMarker.value = marker;
  const markerElem = event.target;
  const imageContainer = markerElem.closest(".image-container");
  const imageRect = imageContainer.getBoundingClientRect();

  const markerPosX = (marker.x / 100) * imageRect.width;
  const markerPosY = (marker.y / 40) * imageRect.height;

  // Determines if the popup should display to the right or left based on marker position
  const shouldDisplayRight = marker.x < 50;

  popupStyle.value = {
    top: markerPosY + imageRect.top + "px",
    left: shouldDisplayRight ? markerPosX + imageRect.left + 15 + "px" : "auto",
    right: shouldDisplayRight
      ? "auto"
      : document.documentElement.clientWidth -
        markerPosX -
        imageRect.left +
        15 +
        "px",
  };
}

function closePopup() {
  currentMarker.value = null;
}
</script>

<style scoped>
.labeled-graphic {
  max-width: 984px;
  margin: 0 auto;
}

.image-container {
  position: relative;
  cursor: pointer;
  text-align: center;
  width: 100%;
}

.labeled-graphic__image {
  width: 100%;
  height: auto;
}
.popupimage {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.bodytextpopup {
  padding-top: 10px;
  font-size: 16px;
  line-height: 22px;
  font-family: Oscine, sans-serif;
  color: #0c0931;
}

.marker {
  position: absolute;
  cursor: pointer;
  color: blue;
  font-size: 24px;
}
.marker-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(114, 199, 231, 0.7);
  animation: pulse-animation 2s infinite;
}

@keyframes pulse-animation {
  0% {
    transform: scale(1.2);
    opacity: 1;
  }
  70% {
    transform: scale(2.5);
    opacity: 0, 5;
  }
  100% {
    transform: scale(3.5);
    opacity: 0;
  }
}

.popup {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 1000;
  max-width: 250px;
}
</style>
