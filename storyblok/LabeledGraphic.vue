<template>
  <div v-editable="blok" class="labeled-graphic" @click="closePopup()">
    <h2 class="labeled-graphic__headline">{{ blok.headline }}</h2>
    <div
      class="labeled-graphic__bodytext"
      v-html="labeledgraphicbodytext"
    ></div>

    <div class="image-container" ref="imageContainer">
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
import { ref, computed, defineProps, onMounted } from "vue";

const props = defineProps({
  blok: Object,
});

const labeledgraphicbodytext = computed(() =>
  renderRichText(props.blok.bodyText)
);
const popupbodytext = computed(() =>
  currentMarker.value && currentMarker.value.popupbodytext
    ? renderRichText(currentMarker.value.popupbodytext)
    : ""
);

const currentMarker = ref(null);
const popupStyle = ref({});
const isModalActive = ref(false);
const imageContainer = ref(null); // ref for the image container

onMounted(() => {
  props.blok.markers.forEach((marker) => {
    marker.animationDelay = Math.random() * 5; // Random delay between 0 and 5 seconds
  });
});

const isMobile = computed(() => window.innerWidth < 768);

function showPopup(marker, event) {
  currentMarker.value = marker;
  isModalActive.value = true;
  const container = imageContainer.value;

  if (!container) return;

  const rect = container.getBoundingClientRect();
  const scrollY = window.scrollY; // Get the vertical scroll position

  // Calculating positions based on percentage positions of the marker within the image container
  const markerPosX = (marker.x / 100) * rect.width;
  const markerPosY = (marker.y / 100) * rect.height;

  const shouldDisplayLeft = marker.x >= 50;

  popupStyle.value = {
    // Using `rect.top` with `scrollY` for accurate positioning regardless of scroll
    top: `${rect.top + scrollY + markerPosY - 60}px`,
    left: shouldDisplayLeft ? "auto" : `${rect.left + markerPosX + 40}px`,
    right: shouldDisplayLeft
      ? `${window.innerWidth - (rect.left + markerPosX)}px`
      : "auto",
    visibility: "visible",
    opacity: 1,
  };
}

function closePopup() {
  popupStyle.value = { ...popupStyle.value, opacity: 0 };
  setTimeout(() => {
    currentMarker.value = null;
    isModalActive.value = false;
  }, 300);
}
</script>

<style scoped>
.labeled-graphic__headline {
  padding-bottom: 30px;
}
.labeled-graphic__bodytext {
  padding-bottom: 15px;
  padding-top: 10px;
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
  background-color: rgba(114, 199, 231, 0.75);
  animation: pulse-animation 8s infinite;
}
@keyframes pulse-animation {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  40% {
    transform: scale(3.5);
    opacity: 0;
  }

  100% {
    transform: scale(5);
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
