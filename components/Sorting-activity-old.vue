<template>
  <main class="sorting-activity">
    <div class="sorting-activity__content-wrapper">
      <h3 class="sorting-activity__title">
        Do you remember what's included in a site file? Drag and drop the cards
        into the correct boxes.
      </h3>
      <div class="sorting-activity__card-container">
        <div
          v-if="!cardPosition.animation"
          class="sorting-activity__card"
          :style="cardStyle"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
        >
          <p class="sorting-activity__card-title">Draggable card</p>
          <svg
            class="sorting-activity__card-icon"
            width="31"
            height="11"
            viewBox="0 0 31 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.5 0.5H30.5" stroke="#CED4DA" stroke-linecap="round" />
            <path d="M0.5 5.5H30.5" stroke="#CED4DA" stroke-linecap="round" />
            <path d="M0.5 10.5H30.5" stroke="#CED4DA" stroke-linecap="round" />
          </svg>
        </div>

        <div class="sorting-activity__dropzone-container">
          <div class="sorting-activity__dropzone" ref="dropzone1">
            <p class="sorting-activity__dropzone-title">dropzone 1</p>
          </div>
          <div class="sorting-activity__dropzone" ref="dropzone2">
            <p class="sorting-activity__dropzone-title">dropzone 2</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const isDragging = ref(false);
const cardPosition = ref({ x: 0, y: -200 }); // Start position changed
const startPosition = ref({ x: 0, y: 0 });
const cardRotation = ref(0); // Initialize card rotation
const dropzone1 = ref(null);
const dropzone2 = ref(null);

const startDrag = (event) => {
  isDragging.value = true;
  startPosition.value = {
    x: event.clientX - cardPosition.value.x,
    y: event.clientY - cardPosition.value.y,
  };
  if (!isOverDropZone()) {
    // Add rotation when dragging starts if not over dropzone
    cardRotation.value = 3;
  }
  event.preventDefault();
};

const onDrag = (event) => {
  if (isDragging.value) {
    cardPosition.value = {
      x: event.clientX - startPosition.value.x,
      y: event.clientY - startPosition.value.y,
    };
  }
};

const endDrag = () => {
  isDragging.value = false;
  if (isOverDropZone(dropzone1.value)) {
    applyRightAnswerAnimation();
  } else if (isOverDropZone(dropzone2.value)) {
    applyWrongAnswerAnimation();
    cardPosition.value = { ...cardPosition.value, animation: true }; // Set animation for fade-out-and-disappear
  } else {
    cardPosition.value = { x: 0, y: -200 }; // Reset to start position
    cardRotation.value = 0; // Reset rotation
  }
};

function isOverDropZone(dropzone) {
  if (!dropzone) return false;
  const cardRect = document
    .querySelector(".sorting-activity__card")
    .getBoundingClientRect();
  const dzRect = dropzone.getBoundingClientRect();

  return (
    cardRect.left < dzRect.right &&
    cardRect.right > dzRect.left &&
    cardRect.top < dzRect.bottom &&
    cardRect.bottom > dzRect.top
  );
}

function applyRightAnswerAnimation() {
  const dropzoneRect = dropzone1.value.getBoundingClientRect();
  const cardRect = document
    .querySelector(".sorting-activity__card")
    .getBoundingClientRect();
  const offsetX = dropzoneRect.left - cardRect.left;
  const offsetY = dropzoneRect.top - cardRect.top;
  cardPosition.value = { x: offsetX, y: offsetY };
  setTimeout(() => {
    cardPosition.value = { ...cardPosition.value, animation: true };
    setTimeout(() => {
      cardPosition.value = { x: offsetX, y: offsetY + 1000 }; // Move the card below the dropzone
      setTimeout(() => {
        // Remove card from DOM
        cardPosition.value = { x: 0, y: -200, animation: false }; // Reset position and animation state
      }, 600); // Animation duration
    }, 600); // Delay before moving below dropzone
  }, 100); // Delay before starting animation
}

const cardStyle = computed(() => ({
  transform: `translate(${cardPosition.value.x}px, ${
    cardPosition.value.y
  }px) rotate(${cardRotation.value}deg) scale(${isDragging.value ? 1.01 : 1})`,
  transition: isDragging.value ? "none" : "transform 0.6s ease",
  cursor: isDragging.value ? "grabbing" : "grab",
  animation: isOverDropZone(dropzone2.value)
    ? "fade-out-and-disappear 0.6s forwards"
    : cardPosition.value.animation
    ? "scale-down-and-disappear 0.6s forwards"
    : "none",
}));
</script>

<style scoped>
@keyframes fade-out-and-disappear {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}

.sorting-activity {
  align-items: center;
  background-color: #f9fdff;
  display: flex;
  justify-content: center;
  padding: 60px;
}

.sorting-activity__content-wrapper {
  display: flex;
  width: 100%;
  max-width: 965px;
  flex-direction: column;
}

.sorting-activity__title {
  color: #0c0931;
  font: 300 22px/27px Oscine, sans-serif;
  font-feature-settings: "clig" off, "liga" off;
}

.sorting-activity__card-container {
  align-items: center;
  display: flex;
  margin-top: 150px;
  justify-content: center;
  padding: 0 60px;
  flex-direction: column;
}

.sorting-activity__card {
  position: absolute;
  box-shadow: 0px 0px 15px 0px rgba(32, 132, 201, 0.5);
  background-color: #fff;
  display: flex;
  width: 328px;
  flex-direction: column;
  font-size: 22px;
  color: #0c0931;
  font-weight: 300;
  text-align: center;
  line-height: 27px;
  padding: 21px 31px;
  transition: 3s ease;
  cursor: grab;
}
.sorting-activity__card:hover {
  box-shadow: 0px 0px 15px 0px rgba(32, 132, 201, 1);
}

.sorting-activity__card-icon {
  aspect-ratio: 3.03;
  width: 30px;
  align-self: center;
  margin-top: 57px;
}

.sorting-activity__dropzone-container {
  justify-content: center;
  margin-top: 60px;
  display: flex;
  gap: 20px;
  width: 100%;
}

.sorting-activity__dropzone {
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 15px 0px rgba(32, 132, 201, 0.5);
  border: 1px dashed rgba(32, 132, 201, 1);
  background-color: #e2f5fc;
  flex-grow: 1;
  color: #0c0931;
  text-align: center;
  width: 50%;
  padding: 108px 22px 80px;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(-5px);
  }
}
</style>
