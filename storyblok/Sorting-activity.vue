<template>
    <div v-editable="blok" class="sorting-activity">
        <p>{{ blok.dropslot1 }}</p>
      <div class="counters">
        <div class="counter-item">
          Correct: {{ correctCount }}
        </div>
        <div class="counter-item">
          Wrong: {{ wrongCount }}
        </div>
      </div>
  
      <div class="cards-and-zones">
        <!-- Draggable cards -->
        <div class="cards">
          <div
            v-for="card in blok.cards"
            :key="card._uid"
            class="card"
            :class="{ 'correct-slot': card.correctZone, 'wrong-slot': !card.correctZone }"
            draggable="true"
            @dragstart="handleDragStart(card)"
            @dragend="handleDragEnd(card)"
            :style="{ zIndex: card.zIndex }"
          >
            {{ card.name }}
          </div>
        </div>
  
        <!-- Drop zones -->
        <div class="drop-zones">
          <div class="drop-zone correct" @dragover.prevent="handleDragOver('correct')" @drop="handleDrop(card, 'correct', $event)">
            <p>{{ blok.dropslot1 }}</p>
          </div>
          <div class="drop-zone wrong" @dragover.prevent="handleDragOver('wrong')" @drop="handleDrop(card, 'wrong', $event)">
            <p>{{ blok.dropslot2 }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
<script setup lang="ts">
import { defineProps, ref } from "vue";
defineProps({ blok: Object });

const correctCount = ref(0);
const wrongCount = ref(0);

const handleDragStart = (card, event) => {
  card.zIndex = 100;  // Bring this card to the top
};

const handleDragEnd = (card) => {
  card.zIndex = 0;  // Reset z-index after dropping
};

const handleDragOver = (zone, event) => {
  event.preventDefault();
};

const handleDrop = (card, zone, event) => {
  event.preventDefault();
  if ((card.correctZone && zone === 'correct') || (!card.correctZone && zone === 'wrong')) {
    card.correctSlot = true;
    correctCount.value += 1;
  } else {
    card.wrongSlot = true;
    wrongCount.value += 1;
  }

  // Optionally, add a timeout to reset the card state
  setTimeout(() => {
    card.correctSlot = false;
    card.wrongSlot = false;
  }, 3000); // Display result for 3 seconds
};
</script>

  
  <style scoped>
  @keyframes flashCorrect {
  0%, 100% { background-color: lightgreen; }
  50% { background-color: transparent; }
}

@keyframes flashWrong {
  0%, 100% { background-color: lightcoral; }
  50% { background-color: transparent; }
}
.sorting-activity {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: auto;
}

.counters {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.counter-item {
  margin-right: 20px;
}

.cards-and-zones {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
}

.cards {
  position: relative;
  height: 246px; /* Height of one card */
  z-index: 2; /* Ensure cards are above drop zones */
}

.drop-zones {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 120px; /* Space between cards and zones */
}

.drop-zone {
  display: flex;
  justify-content: center;
  align-items: center; /* Center content vertically and horizontally */
  min-width: 246px;
  height: 246px;
  margin: 0 20px;
  border: 2px dashed #ccc;
  background-color: #E2F5FC;
  z-index: 1; /* Lower than cards */
}

.card {
  display: flex;
  justify-content: center;
  align-items: center; /* Center content vertically and horizontally */
  width: 246px;
  height: 246px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: #2084C9;
  cursor: grab;
  transition: transform 3s ease, z-index 0s;
}

.card:not(:first-child) {
  box-shadow: 0 1px 3px #E2F5FC;
}

.correct-slot {
  background-color: lightgreen;
}

.wrong-slot {
  background-color: lightcoral;
}
</style>
