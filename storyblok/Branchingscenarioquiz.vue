<template>
  <p>{{ blok.headline }}</p>
  <div class="branchingscenarioquiz">
    <div v-for="(card, index) in blok.quizcards" :key="index">
      <Branchingscenariocard :blok="card" :currentCard.sync="currentCard" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({ blok: Object });
let currentCard = ref(1);

console.log(props.blok.quizcards); // Add this line
</script>
