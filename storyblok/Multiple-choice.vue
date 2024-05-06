<template>
  <div class="quiz">
    <form>
      <div class="quiz__header">
        <img
          :src="blok.image.filename"
          :alt="blok.image.alt"
          class="quiz__image"
        />
        <h2 class="quiz__headline">{{ blok.headline }}</h2>
      </div>
      <p class="quiz__bodytext">{{ blok.bodytext }}</p>
      <div
        v-for="(option, index) in blok.options"
        :key="index"
        class="quiz__option"
      >
        <label
          :class="{
            'quiz__option--selected': selectedOption === index.toString(),
            'quiz__option-label': true,
          }"
          @click="selectOption(index)"
        >
          <input
            type="radio"
            :id="'option' + index"
            name="quiz_option"
            :value="index"
            v-model="selectedOption"
            :disabled="submitted"
            class="quiz__input"
          />
          {{ option.text }}
        </label>
      </div>
      <transition name="fade">
        <div
          v-if="submitted"
          :class="
            blok.options[selectedOption].isCorrect
              ? 'quiz__feedback--correct'
              : 'quiz__feedback--incorrect'
          "
        >
          <img
            :src="
              blok.options[selectedOption].isCorrect
                ? '/icon-correct.svg'
                : '/icon-wrong.svg'
            "
            class="quiz__icon"
            alt="Feedback Icon"
          />

          <div class="quiz__header">
            <h3 class="quiz__text">
              {{
                blok.options[selectedOption].isCorrect
                  ? blok.headlinecorrect
                  : blok.headlinewrong
              }}
            </h3>
          </div>
          <p class="quiz__message">
            {{
              blok.options[selectedOption].isCorrect
                ? blok.textcorrect
                : blok.textwrong
            }}
          </p>

          <div class="quiz__submit-container">
            <input
              type="button"
              value="Try Again"
              class="quiz__submit-button"
              @click="resetQuiz"
            />
          </div>
        </div>
      </transition>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
defineProps({ blok: Object });
let selectedOption = ref(null);
let submitted = ref(false);

const selectOption = (index) => {
  if (!submitted.value) {
    selectedOption.value = index;
  }
};

watch(selectedOption, () => {
  if (selectedOption.value !== null) {
    setTimeout(() => {
      submitted.value = true;
    }, 100);
  }
});

const resetQuiz = () => {
  selectedOption.value = null;
  submitted.value = false;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.quiz {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fdff;
  padding-top: 60px;
  padding-bottom: 60px;
  width: 100%;
}

.quiz__header {
  padding-bottom: 15px;
  padding-top: 15px;
}

.quiz__image {
  width: 100%;
}

.quiz__headline,
.quiz__bodytext,
.quiz__option-label {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
  margin-bottom: 15px;
  margin-top: 15px;
}

.quiz__option {
  width: 100%;
  margin-bottom: 15px;
}

.quiz__option-label {
  display: block;
  padding: 15px;
  cursor: pointer;
}

.quiz__option-label:hover {
  background-color: #effafe;
}

.quiz__option--selected {
  border: 3px solid #2084c9;
}

.quiz__option-label.quiz__option--selected {
  border: 3px solid #2084c9;
  box-sizing: border-box;
}

.quiz__form {
  background-color: #fff;
  padding: 20px;
  width: 100%;
  max-width: 646px;
}

.quiz__submit-button {
  padding: 10px 20px;
  background-color: #2084c9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.quiz__submit-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.quiz__feedback--correct,
.quiz__feedback--incorrect {
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

.quiz__feedback--correct .quiz__header,
.quiz__feedback--incorrect .quiz__header {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 475px;
  font-size: 30px;
  line-height: 36px;
  font-family: "Oscine";
  font-weight: 300;
}

.quiz__feedback--correct .quiz__icon,
.quiz__feedback--incorrect .quiz__icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 107px;
  max-width: 100%;
}

.quiz__icon {
  width: 45px;
  height: 45px;
  object-fit: auto;
  object-position: center;
}

.quiz__feedback--correct .quiz__text,
.quiz__feedback--incorrect .quiz__text {
  margin-top: 31px;
  font-family: Oscine Trial, sans-serif;
}

.quiz__feedback--correct .quiz__message,
.quiz__feedback--incorrect .quiz__message {
  color: #0c0931;
  margin-top: 0px;
  font: 16px/24px Open Sans, sans-serif;
  font-weight: 300;
  font-feature-settings: "clig" off, "liga" off;
}

@media (max-width: 991px) {
  .quiz__feedback--correct .quiz__message,
  .quiz__feedback--incorrect .quiz__message {
    max-width: 100%;
  }
}

.quiz__feedback--correct .quiz__try-again-button,
.quiz__feedback--incorrect .quiz__try-again-button {
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
