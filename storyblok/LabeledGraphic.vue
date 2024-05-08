<template>
  <div v-editable="blok" class="labeled-graphic" @click="closePopup()">
    <h2 class="labeled-graphic__headline">{{ blok.headline }}</h2>
    <div
      class="labeled-graphic__bodytext"
      v-html="labeledgraphicbodytext"
    ></div>

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
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="15" fill="#2084C9" />
            <path
              d="M19.44 14.005H15.82V10.4C15.82 9.905 15.415 9.5 14.92 9.5C14.425 9.5 14.02 9.905 14.02 10.4V14.02H10.4C9.905 14.02 9.5 14.425 9.5 14.92C9.5 15.415 9.905 15.82 10.4 15.82H14.02V19.44C14.02 19.935 14.425 20.34 14.92 20.34C15.415 20.34 15.82 19.935 15.82 19.44V15.805H19.44C19.935 15.805 20.34 15.4 20.34 14.905C20.34 14.41 19.935 14.005 19.44 14.005Z"
              fill="white"
            />
          </svg>
          <div
            class="pulse"
            :style="{ animationDelay: marker.animationDelay + 's' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Modal for smaller screens -->
    <div v-if="isModalActive && isMobile" class="modal">
      <div class="modal-content">
        <span class="close" @click="closePopup()">&times;</span>
        <img
          v-if="currentMarker.popupImage && currentMarker.popupImage.filename"
          :src="currentMarker.popupImage.filename"
          class="popupimage"
          alt="Marker Detail"
        />
        <h3>{{ currentMarker.popupText }}</h3>
        <div class="labeled-graphic__bodytext" v-html="popupbodytext"></div>
      </div>
    </div>

    <!-- Popup for larger screens -->
    <div
      v-if="currentMarker && !isMobile"
      class="popup"
      :style="popupStyle"
      :class="{ 'popup-visible': currentMarker }"
    >
      <img
        v-if="currentMarker.popupImage && currentMarker.popupImage.filename"
        :src="currentMarker.popupImage.filename"
        class="popupimage"
        alt="Marker Detail"
      />
      <h3>{{ currentMarker.popupText }}</h3>

      <div class="labeled-graphic__bodytext" v-html="popupbodytext"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue";
const props = defineProps({
  blok: Object,
});
const labeledgraphicbodytext = computed(() =>
  renderRichText(props.blok.bodyText)
);
const popupbodytext = computed(() => {
  if (currentMarker.value && currentMarker.value.popupbodytext) {
    return renderRichText(currentMarker.value.popupbodytext);
  }
  return "";
});

const currentMarker = ref(null);
const popupStyle = ref({});
const isModalActive = ref(false);

// Compute random animation delays for each marker
onMounted(() => {
  props.blok.markers.forEach((marker) => {
    // Assign a random delay from 0 to the duration of the animation cycle (2 seconds here)
    marker.animationDelay = Math.random() * 2; // Random delay between 0 and 2 seconds
  });
});

const isMobile = computed(() => {
  return window.innerWidth < 768; // Adjust threshold as needed
});

function showPopup(marker, event) {
  currentMarker.value = marker;
  isModalActive.value = true; // Activate modal on marker click if on mobile
  const imageContainer = document.querySelector(".image-container");

  if (!imageContainer) return;

  const containerTop = imageContainer.offsetTop;
  const containerLeft = imageContainer.offsetLeft;

  const markerPosX = (marker.x / 100) * imageContainer.offsetWidth;
  const markerPosY = (marker.y / 200) * imageContainer.offsetHeight;

  // Determine which side of the marker the popup should appear on
  const shouldDisplayLeft = marker.x >= 50; // Popups for markers on the right side appear to the left

  popupStyle.value = {
    top: markerPosY + containerTop + "px",
    left: shouldDisplayLeft ? markerPosX + containerLeft - 370 + "px" : "auto", // Position left if marker is on the right
    right: shouldDisplayLeft
      ? "auto"
      : document.documentElement.clientWidth -
        markerPosX -
        containerLeft -
        400 +
        "px", // Position right if marker is on the left
    visibility: "visible",
    opacity: 1,
  };
}

function closePopup() {
  if (currentMarker.value) {
    popupStyle.value = { ...popupStyle.value, opacity: 0 };
    isModalActive.value = false;
    setTimeout(() => {
      currentMarker.value = null;
    }, 300);
  }
}
</script>

<style scoped>
.labeled-graphic__headline {
  padding-bottom: 30px;
}
.labeled-graphic__bodytext {
  padding-bottom: 30px;
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  font-weight: 300;
}
.labeled-graphic {
  max-width: 984px;
  margin: 0 auto;
  margin-top: 60px;
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
.bodytextpopup {
  font-family: "Open Sans";
  font-size: 16px;
  line-height: 22px;
  font-weight: 300;
  padding-top: 10px;
  color: #0c0931;
}
.popup {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  padding: 15px;
  border-radius: 6px;
  z-index: 1000;
  width: 350px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  visibility: hidden;
}

.popupimage {
  width: 100%;
  padding-bottom: 15px;
}
.popup-visible {
  opacity: 1;
  visibility: visible;
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
  background-color: rgba(114, 199, 231, 0.85);
  animation: pulse-animation 2s infinite;
}
@keyframes pulse-animation {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(3.5);
    opacity: 0;
  }
}
.modal {
  display: flex;
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #00308733;
}
.modal-content {
  margin: auto;
  background: white;
  padding: 15px;
  border-radius: 6px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
@media (min-width: 768px) {
  .modal,
  .modal-content {
    display: none;
  }
}
</style>
