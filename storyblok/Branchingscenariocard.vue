<template>
  <p>show me cardnumb {{ blok.cardnumber }}</p>

  <div class="quiz-container" v-if="blok.cardnumber === currentCard">
    <div class="quiz-header">
      <h3>{{ blok.headline }}</h3>
      <img
        :src="blok.image.filename"
        :alt="blok.image.alt"
        class="teaser-image"
      />
    </div>
    <p>{{ blok.bodytext }}</p>
    <div v-for="(option, index) in blok.options" :key="index" class="option">
      <Answerscenario :blok="option" />
    </div>
    <div class="submit-container" v-if="submitted">
      <input
        type="submit"
        value="Continue"
        class="submit-button"
        @click.prevent="continueQuiz"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({ blok: Object, currentCard: Number });
let submitted = ref(false);

console.log(props.blok);

const continueQuiz = () => {
  let scenarionumber = props.blok.options.find(
    (option) => option._uid === props.selectedOption.value
  ).scenarionumber;
  $emit("update:currentCard", scenarionumber);
  submitted.value = false;
};
</script>

<style scoped>
p {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
}

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
  margin-bottom: 15px;
}

.option-label {
  display: block;
  padding: 15px;
  cursor: pointer;
}

.option-label:hover {
  background-color: #effafe; /* Change the background color when hovering over the option */
}

/*  .option-label input[type="radio"] {position: absolute;
  opacity: 0; }If you want the radio button to be hidden but still clickable */

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
  font-size: 30px;
  line-height: 36px;
  font-family: "Oscine";
  font-weight: 300;
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
  font-weight: 300;
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
