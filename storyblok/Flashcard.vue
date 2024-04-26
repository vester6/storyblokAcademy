<template>
  <div class="flip" @click="toggleFlip">
    <div class="card" :class="{ flipped: isFlipped }">
      <div class="face front">
        <div v-editable="blok" class="card-teaser">
          <div class="teaser-content">
            <img
              :src="blok.image.filename"
              :alt="blok.image.alt"
              class="teaser-image"
            />
            <div class="teaser-text">
              {{ blok.name }}
              {{ blok.bodytext }}
            </div>
            <div class="svg-container">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.46055 0.544922C5.95055 0.544922 3.02555 3.01992 2.30555 6.31992L1.75055 5.74992C1.40555 5.40492 0.835547 5.40492 0.475547 5.74992C0.130547 6.09492 0.130547 6.66492 0.475547 7.02492L2.44055 8.98992C2.62055 9.16992 2.84555 9.25992 3.07055 9.25992C3.29555 9.25992 3.53555 9.16992 3.70055 8.98992L5.66555 7.02492C6.01055 6.67992 6.01055 6.10992 5.66555 5.74992C5.32055 5.40492 4.75055 5.40492 4.39055 5.74992L4.30055 5.83992C5.14055 3.79992 7.13555 2.34492 9.46055 2.34492C12.5055 2.34492 14.9805 4.81992 14.9805 7.86492C14.9805 10.9099 12.5055 13.3849 9.46055 13.3849C8.96555 13.3849 8.56055 13.7899 8.56055 14.2849C8.56055 14.7799 8.96555 15.1849 9.46055 15.1849C13.4955 15.1849 16.7805 11.8999 16.7805 7.86492C16.7805 3.82992 13.4955 0.544922 9.46055 0.544922Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="face back">
        <img
          :src="blok.imagebackside.filename"
          :alt="blok.imagebackside.alt"
          class="teaser-image"
        />
        <div class="teaser-text">
          {{ blok.namebackside }}
          {{ blok.bodytextbackside }}
        </div>
        <div class="svg-container">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.46055 0.544922C5.95055 0.544922 3.02555 3.01992 2.30555 6.31992L1.75055 5.74992C1.40555 5.40492 0.835547 5.40492 0.475547 5.74992C0.130547 6.09492 0.130547 6.66492 0.475547 7.02492L2.44055 8.98992C2.62055 9.16992 2.84555 9.25992 3.07055 9.25992C3.29555 9.25992 3.53555 9.16992 3.70055 8.98992L5.66555 7.02492C6.01055 6.67992 6.01055 6.10992 5.66555 5.74992C5.32055 5.40492 4.75055 5.40492 4.39055 5.74992L4.30055 5.83992C5.14055 3.79992 7.13555 2.34492 9.46055 2.34492C12.5055 2.34492 14.9805 4.81992 14.9805 7.86492C14.9805 10.9099 12.5055 13.3849 9.46055 13.3849C8.96555 13.3849 8.56055 13.7899 8.56055 14.2849C8.56055 14.7799 8.96555 15.1849 9.46055 15.1849C13.4955 15.1849 16.7805 11.8999 16.7805 7.86492C16.7805 3.82992 13.4955 0.544922 9.46055 0.544922Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  blok: Object,
});
const isFlipped = ref(false);

function toggleFlip() {
  isFlipped.value = !isFlipped.value;
}
</script>

<style scoped>
.svg-container {
  position: absolute;
  right: 10px; /* Adjust based on your design */
  bottom: 30px; /* Adjust based on your design */
}
.flip {
  width: 100%;
  height: auto;
  position: relative;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 15px;

  perspective: 1000px; /* Control depth effect */
  cursor: pointer;
}

.flip .card {
  width: 100%;
  height: auto;
  transform-style: preserve-3d;
  background: rgb(245, 251, 255);
  background: linear-gradient(
    90deg,
    rgba(245, 251, 255, 0.45) 20%,
    rgba(245, 251, 255, 0.2) 63%,
    rgba(245, 251, 255, 0) 100%
  );
  transition: transform 0.8s cubic-bezier(0.2, 1, 0.3, 1);
}

.flip .card.flipped {
  transform: rotateY(180deg);
}

.face {
  width: 100%;
  height: auto;
  position: absolute;
  backface-visibility: hidden;
}

.front {
  z-index: 2;
}

.back {
  transform: rotateY(180deg);
}

.card-teaser {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.teaser-image {
  position: relative;
  width: 100%;
  min-height: 235px;
  object-fit: cover;
  max-width: 500px;
  margin-bottom: 20px;
}

.teaser-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(20, 20, 20, 0.45) 20%,
    rgba(20, 20, 20, 0.2) 63%,
    rgba(20, 20, 20, 0) 100%
  );
  z-index: 1; /* Ensure it is above the image but below the text */
}

.teaser-content h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.teaser-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 30px;
  line-height: 36px;
  font-family: "oscine";
  color: #fff;
  font-weight: 300;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 2; /* Ensure text is above the gradient */
}
</style>
