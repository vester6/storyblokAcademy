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
        <!-- Add your content for the back of the card here -->
      </div>
    </div>
  </div>
</template>

<script setup>
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
.flip {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 15px;
  perspective: 1000px; /* Control depth effect */
}

.flip .card {
  width: 100%;
  height: auto;
  transform-style: preserve-3d;
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
  width: 100%;
  min-height: 235px;
  object-fit: cover;
  max-width: 500px;
  margin-bottom: 20px;
}

.teaser-content h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.teaser-content p {
  margin-top: 0;
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
}
</style>
