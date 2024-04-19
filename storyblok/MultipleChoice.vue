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
          :disabled="submitted"
        />
        <label
          :class="{ selected: selectedOption === index.toString() }"
          :for="'option' + index"
          >{{ option.text }}</label
        >
      </div>
      <div class="submit-container" v-if="!submitted">
        <input type="submit" value="Submit" class="submit-button" />
      </div>
      <div
        v-if="submitted"
        :class="
          blok.options[selectedOption].isCorrect
            ? 'correct-answer'
            : 'incorrect-answer'
        "
      >
        <div class="header">
          <div class="text">
            {{
              blok.options[selectedOption].isCorrect
                ? blok.headlinewrong
                : blok.headlinecorrect
            }}
          </div>
        </div>
        <div class="message">
          {{
            blok.options[selectedOption].isCorrect
              ? blok.textcorrect
              : blok.textwrong
          }}
        </div>
        <div class="submit-container">
          <input type="submit" value="Try Again" class="submit-button" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
defineProps({ blok: Object });
let selectedOption = ref(null);
let submitted = ref(false);

const submitQuiz = () => {
  if (submitted.value) {
    // Reset the quiz
    selectedOption.value = null;
    submitted.value = false;
  } else {
    // Submit the quiz
    submitted.value = true;
    console.log(`Selected option value: ${selectedOption.value}`);
    // Add more logic as required
  }
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
  width: 100%;
  height: 30px;
  padding: 15px;
  margin-bottom: 15px;
  margin-top: 15px; /* Make the element take up the whole width of its container */
}

.option:hover {
  background-color: #effafe; /* Change the background color when hovering over the element */
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
.correct-answer,
.incorrect-answer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 924px;
  padding: 35px 80px;
  background-color: #effafe;
  font-weight: 300;
  text-align: center;
}

@media (max-width: 991px) {
  .correct-answer,
  .incorrect-answer {
    padding: 0 20px;
  }
}

.correct-answer .header,
.incorrect-answer .header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 475px;
  padding: 2px 60px;
  font-size: 30px;
  color: #0c0931;
  line-height: 120%;
}

@media (max-width: 991px) {
  .correct-answer .header,
  .incorrect-answer .header {
    padding: 0 20px;
    white-space: initial;
  }
}

.correct-answer .icon,
.incorrect-answer .icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 107px;
  max-width: 100%;
}

.icon {
  width: 45px;
  height: 45px;

  object-fit: auto;
  object-position: center;
}

.correct-answer .text,
.incorrect-answer .text {
  margin-top: 31px;
  font-family: Oscine Trial, sans-serif;
}

.correct-answer .message,
.incorrect-answer .message {
  margin-top: 30px;
  color: #0c0931;
  font: 16px/24px Open Sans, sans-serif;
  font-feature-settings: "clig" off, "liga" off;
}

@media (max-width: 991px) {
  .correct-answer .message,
  .incorrect-answer .message {
    max-width: 100%;
  }
}

.correct-answer .try-again-button,
.incorrect-answer .try-again-button {
  margin-top: 30px;
  padding: 2px 0;
  border-radius: 6px;
  background-color: #2084c9;
  color: #72c7e7;
  font: 600 14px/27px Open Sans, sans-serif;
  justify-content: center;
  cursor: pointer;
}
</style>
