<template>
    <div class="sorting-activity">
      <!-- Counters -->
      <div class="counters">
        <div class="counter-item">
          Correct: {{ correctCount }}
        </div>
        <div class="counter-item">
          Wrong: {{ wrongCount }}
        </div>
      </div>
  
      <!-- Cards and Drop Zones Container -->
      <div class="cards-and-zones">
        <!-- Draggable cards -->
        <div class="cards">
          <div
            class="card"
            v-for="element in list"
            :key="element.id"
            :class="{ 'correct-slot': element.correctSlot, 'wrong-slot': element.wrongSlot }"
            draggable="true"
            @dragstart="handleDragStart(element)"
            @dragend="handleDragEnd(element)"
            :style="{ zIndex: element.zIndex }"
          >
            {{ element.name }}
          </div>
        </div>
  
        <!-- Drop zones -->
        <div class="drop-zones">
          <div class="drop-zone correct" @dragover.prevent="handleDragOver('correct')" @drop="handleDrop('correct')"><p>Slot 1</p></div>
          <div class="drop-zone wrong" @dragover.prevent="handleDragOver('wrong')" @drop="handleDrop('wrong')"><p>Slot 2</p></div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script setup>
  import { ref } from 'vue';
  
  const list = ref([
    { id: 1, name: 'John', correctZone: 'correct', wrongSlot: false, scale: 1, zIndex: 0 },
    { id: 2, name: 'Joao', correctZone: 'wrong', wrongSlot: false, scale: 1, zIndex: 0 },
    { id: 3, name: 'Jean', correctZone: 'correct', wrongSlot: false, scale: 1, zIndex: 0 },
    { id: 4, name: 'Gerard', correctZone: 'correct', wrongSlot: false, scale: 1, zIndex: 0 },
  ]);
  
  const correctCount = ref(0);
  const wrongCount = ref(0);
  
  const handleDragStart = (element) => {
    // Bring the card to the top visually
    list.value.forEach(card => {
      if (card.id === element.id) {
        card.zIndex = 100; // Bring this card to the top
      } else {
        card.zIndex = 0; // Push other cards to the bottom
      }
    });
    event.dataTransfer.setData('text/plain', element.id.toString());
  };
  
  const handleDragEnd = (element) => {
    // Reset z-index after dropping
    list.value.forEach(card => card.zIndex = 0);
    element.correctSlot = false;
    element.wrongSlot = false;
  };
  
  const handleDragOver = (zone) => {
    event.preventDefault();
  };
  
  const handleDrop = (zone) => {
    const cardId = parseInt(event.dataTransfer.getData('text/plain'));
    const droppedCard = list.value.find((element) => element.id === cardId);
  
    if (droppedCard.correctZone === zone) {
      droppedCard.correctSlot = true;
      correctCount.value += 1;
      droppedCard.scale = 1.1;
      setTimeout(() => {
        list.value = list.value.filter((element) => element.id !== cardId);
      }, 300);
    } else {
      droppedCard.wrongSlot = true;
      wrongCount.value += 1;
      droppedCard.scale = 0.9;
    }
  
    droppedCard.correctSlot = droppedCard.correctZone === zone;
    droppedCard.wrongSlot = droppedCard.correctZone !== zone;
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
