<template>
  <div class="quiz">
    <div class="quiz__content">
      <div class="quiz__header">
        <img
          :src="blok.image.filename"
          :alt="blok.image.alt"
          class="quiz__image"
        />
        <h2 class="quiz__headline">{{ blok.headline }}</h2>
      </div>
      <h3 class="quiz__bodytext">{{ blok.bodytext }}</h3>
      <form @submit.prevent="handleSubmit">
        <div
          v-for="(option, index) in blok.options"
          :key="index"
          :class="[
            'quiz__option',
            {
              'quiz__option--correct': isCorrectOption(index),
              'quiz__option--incorrect': isIncorrectOption(index),
            },
          ]"
        >
          <label
            :class="{
              'quiz__option--selected': isSelected(index),
              'quiz__option-label': true,
            }"
            tabindex="0"
            role="button"
            @keydown.space.prevent="selectOption(index)"
            @keydown.enter.prevent="selectOption(index)"
          >
            <input
              :type="blok.multipleresponse ? 'checkbox' : 'radio'"
              :id="'option' + index"
              name="quiz_option"
              :value="index"
              v-model="selectedOption"
              :disabled="submitted"
              class="quiz__input"
              :aria-checked="isSelected(index).toString()"
              :aria-disabled="submitted.toString()"
            />
            <img :src="getIcon(index)" class="quiz__icon" alt="Option Icon" />
            {{ option.text }}
          </label>
        </div>
        <div v-if="!submitted" class="quiz__submit-container">
          <input
            type="submit"
            value="Submit"
            class="quiz__submit-button"
            :disabled="submitted"
          />
        </div>
      </form>
      <transition name="fade">
        <div
          v-if="submitted"
          :class="
            isCorrect ? 'quiz__feedback--correct' : 'quiz__feedback--incorrect'
          "
        >
          <img
            :src="getFeedbackIcon"
            class="quiz__feedback-icon"
            alt="Feedback Icon"
          />
          <div class="quiz__header">
            <h3 class="quiz__text">
              {{ isCorrect ? blok.headlinecorrect : blok.headlinewrong }}
            </h3>
          </div>
          <p class="quiz__message">
            {{ isCorrect ? blok.textcorrect : blok.textwrong }}
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from "vue";
import type { PropType } from "vue";
import type { MultipleChoiceStoryblok } from "~/component-types-sb";

const props = defineProps({
  blok: { type: Object as PropType<MultipleChoiceStoryblok>, default: null },
});

const selectedOption = ref(props.blok.multipleresponse ? [] : null);
const submitted = ref(false);

const selectOption = (index) => {
  if (!submitted.value) {
    if (props.blok.multipleresponse) {
      const currentIndex = selectedOption.value.indexOf(index);
      if (currentIndex > -1) {
        selectedOption.value.splice(currentIndex, 1);
      } else {
        selectedOption.value.push(index);
      }
    } else {
      selectedOption.value = index;
    }
  }
};

const handleSubmit = () => {
  submitted.value = true;
};

const resetQuiz = () => {
  selectedOption.value = props.blok.multipleresponse ? [] : null;
  submitted.value = false;
};

const isSelected = (index) => {
  if (props.blok.multipleresponse) {
    return selectedOption.value.includes(index);
  } else {
    return selectedOption.value === index;
  }
};

const isCorrect = computed(() => {
  if (props.blok.multipleresponse) {
    return (
      selectedOption.value.every(
        (index) => props.blok.options[index].isCorrect
      ) &&
      selectedOption.value.length ===
        props.blok.options.filter((option) => option.isCorrect).length
    );
  } else {
    return props.blok.options[selectedOption.value]?.isCorrect;
  }
});

const isCorrectOption = (index) => {
  return submitted.value && props.blok.options[index].isCorrect;
};

const isIncorrectOption = (index) => {
  return (
    submitted.value && !props.blok.options[index].isCorrect && isSelected(index)
  );
};

const getFeedbackIcon = computed(() => {
  if (isCorrect.value) {
    return `/icons/${
      props.blok.multipleresponse ? "Checkmark" : "Radiobutton"
    }-correct.svg`;
  }
  return `/icons/${
    props.blok.multipleresponse ? "Checkmark" : "Radiobutton"
  }-wrong.svg`;
});

const getIcon = (index) => {
  if (submitted.value) {
    return props.blok.options[index].isCorrect
      ? `/icons/${
          props.blok.multipleresponse ? "Checkmark" : "Radiobutton"
        }-correct.svg`
      : `/icons/${
          props.blok.multipleresponse ? "Checkmark" : "Radiobutton"
        }-wrong.svg`;
  }
  return isSelected(index)
    ? `/icons/${
        props.blok.multipleresponse ? "Checkmark" : "Radiobutton"
      }-selected.svg`
    : `/icons/${
        props.blok.multipleresponse ? "Checkmark" : "Radiobutton"
      }-default.svg`;
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
.quiz__content {
  max-width: 656px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
  background-color: white;
}
.quiz__header {
  padding-bottom: 15px;
  padding-top: 15px;
}
.quiz__headline {
  padding-top: 30px;
}
.quiz__image {
  width: 100%;
}

.quiz__option-label {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
  margin-bottom: 15px;
  margin-top: 15px;
  padding: 15px;
  border: 3px solid transparent; /* Add transparent border */
  box-sizing: border-box;
  transition: background-color 0.3s, border-color 0.3s; /* Smooth transitions */
  cursor: pointer; /* Restore the hand cursor */
  display: flex;
  align-items: center;
  width: 100%;
}
.quiz__bodytext {
  margin-bottom: 15px;
  margin-top: 15px;
}

.quiz__option {
  width: 100%;
  margin-bottom: 15px;
  min-height: 48px; /* Ensure consistent height */
}

.quiz__option--correct .quiz__option-label {
  background-color: #e2f5fc; /* background for correct answers */
}

.quiz__option--incorrect .quiz__option-label {
  background-color: #f9fdff; /* background for incorrect answers */
}

.quiz__option-label:hover {
  background-color: #effafe;
  width: 100%;
}

.quiz__option--selected {
  border-color: #2084c9; /* Only change border color */
}

.quiz__option-label.quiz__option--selected {
  border-color: #2084c9;
  width: 100%;
}

.quiz__input {
  display: none; /* Hide the default checkbox and radio button */
}

.quiz__icon {
  width: 20px; /* Set the maximum width for the icons */
  height: 20px; /* Set the maximum height for the icons */
  margin-right: 10px; /* Add margin between the icon and the text */
}

.quiz__form {
  background-color: #fff;
  padding: 20px;
  width: 100%;
  max-width: 646px;
}

.quiz__submit-button {
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  color: #0c0931;
  font-weight: 300;
  text-align: center;
  padding: 10px 20px;
  background-color: #2084c9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s; /* Smooth transitions for button */
}

.quiz__submit-button:hover {
  background-color: #1868a3; /* Darker blue on hover */
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
  max-width: 984px;
  padding: 30px;
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

.quiz__feedback--correct .quiz__feedback-icon,
.quiz__feedback--incorrect .quiz__feedback-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45px; /* Keep the original size for feedback icons */
  height: 45px; /* Keep the original size for feedback icons */
  transition: transform 0.3s ease; /* Smooth transition for feedback icons */
}

.quiz__feedback--correct .quiz__text,
.quiz__feedback--incorrect .quiz__text {
  margin-top: 15px;
  font-family: "Oscine";
}

.quiz__feedback--correct .quiz__message,
.quiz__feedback--incorrect .quiz__message {
  color: #0c0931;
  margin-top: 0px;
  font-family: "Open Sans";
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
