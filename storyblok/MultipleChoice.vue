<template>
  <div class="quiz-container">
    <form @submit.prevent="submitQuiz">
      <div class="quiz-header">
        <h3>
          {{ blok.headline }}
        </h3>
        <img
          :src="blok.image.filename"
          :alt="blok.image.alt"
          class="teaser-image"
        />
      </div>
      <p>{{ blok.bodytext }}</p>
      <div class="option" v-for="(option, index) in blok.options" :key="index">
        <input
          type="radio"
          :id="'option' + index"
          name="quiz_option"
          :value="index"
          v-model="selectedOption"
        />
        <label
          :class="{ selected: selectedOption === index.toString() }"
          :for="'option' + index"
          >{{ option.text }}</label
        >
      </div>
      <div class="submit-container">
        <input type="submit" value="Submit" class="submit-button" />
      </div>
      <p v-if="submitted">
        {{
          blok.options[selectedOption].isCorrect
            ? "Correct answer!"
            : "Wrong answer!"
        }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
defineProps({ blok: Object });
let selectedOption = ref(null);
let submitted = ref(false);

const submitQuiz = () => {
  submitted.value = true;
  console.log(`Selected option value: ${selectedOption.value}`);
  // Add more logic as required
};
</script>

<style scoped>
h3 {
  padding-bottom: 15px;
}

img {
  width: 100%;
}
p,
label {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
  margin-bottom: 15px;
  margin-top: 15px;
}

.option {
  margin-bottom: 15px;
}

.quiz-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fdff;
  padding-top: 60px;
  padding-bottom: 60px;
  width: 100%;
}

.question-image {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}

form {
  background-color: #fff;
  padding: 20px;
  width: 100%;
  max-width: 646px;
}

label {
  margin-left: 10px;
  cursor: pointer;
}

input[type="submit"] {
  padding: 10px 20px;
  background-color: #2084c9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-container {
  display: flex;
  justify-content: center; /* Centers the button horizontally */
  margin-top: 20px;
}
</style>
