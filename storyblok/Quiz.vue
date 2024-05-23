<template>
  <div v-editable="blok" class="quiz">
    <h2>testing 123</h2>
    <div class="quiz__content">
      
      <h3 class="quiz__title">{{ blok.title }}</h3>
      <div v-if="currentQuestion">
        <div class="quiz__image-container">
          <img
            class="quiz__image"
            v-if="currentQuestion.question_image"
            :src="currentQuestion.question_image.filename"
            alt="Question Image"
          />
        </div>
        <h3 class="quiz__question">{{ currentQuestion.question_text }}</h3>
        <ul class="quiz__answers">
          <li v-for="answer in currentQuestion.answers" :key="answer._uid" class="quiz__answer">
            <button class="quiz__button" @click="selectAnswer(answer)">
              {{ answer.answer_text }}
            </button>
          </li>
        </ul>
      </div>
      <div v-else-if="finalText" class="quiz__final">
        <img
          v-if="finalImage"
          :src="finalImage"
          alt="Ending Image"
          class="quiz__final-image"
        />
        <p class="quiz__final-text">{{ finalText }}</p>
        <button class="quiz__button" @click="restartQuiz()">Restart Quiz</button>
      </div>
      <div v-else class="quiz__loading">
        <p>Loading quiz or no quiz data available...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
  blok: Object,
});

const currentQuestion = ref(null);
const finalText = ref(null); // Holds the text for the `finalText` field
const finalImage = ref(null); // Holds the URL for the `finalImage`
const quizData = ref(null); // Store the entire quiz data

const fetchQuizData = () => {
  quizData.value = props.blok;

  console.log('Fetched quiz data:', JSON.stringify(quizData.value, null, 2));

  if (quizData.value && quizData.value.start_question) {
    currentQuestion.value = quizData.value.start_question[0];
  } else {
    currentQuestion.value = null; // Handle cases where no questions are defined
  }
};

const findQuestionById = (id, questions = null) => {
  if (!questions) {
    questions = quizData.value.start_question;
  }

  for (const question of questions) {
    console.log('Checking question:', question._uid);
    if (question._uid === id) {
      return question;
    }
    if (question.answers) {
      for (const answer of question.answers) {
        console.log('Checking answer:', answer._uid);
        if (answer._uid === id) {
          return answer;
        }
        if (answer.next_question && answer.next_question.length > 0) {
          const result = findQuestionById(id, answer.next_question);
          if (result) return result;
        }
      }
    }
  }
  return null;
};

const selectAnswer = (answer) => {
  if (answer.next_question && answer.next_question.length > 0) {
    currentQuestion.value = answer.next_question[0];
    finalText.value = null; // Clear any final text
    finalImage.value = null; // Clear the final image
  } else if (answer.restart_question_id) {
    restartQuiz(answer.restart_question_id);
  } else {
    if (answer.finalText) {
      finalText.value = answer.finalText;
      finalImage.value = answer.finalImage ? answer.finalImage.filename : null;
    } else {
      finalText.value = 'Thank you for completing the quiz!';
      finalImage.value = null; // Ensure no image is displayed for the default message
    }
    currentQuestion.value = null; // Clear current question since we are at the end
  }
};

const restartQuiz = (restartQuestionUid = null) => {
  if (restartQuestionUid) {
    console.log(`Attempting to restart with UID: ${restartQuestionUid}`);
    const restartQuestion = findQuestionById(restartQuestionUid);
    if (restartQuestion) {
      console.log('Restart question found:', JSON.stringify(restartQuestion, null, 2));
      currentQuestion.value = restartQuestion;
    } else {
      console.error('Restart question with provided UID not found:', restartQuestionUid);
      currentQuestion.value = quizData.value.start_question[0]; // Fallback to the first question if UID not found
    }
  } else {
    fetchQuizData(); // Restart the quiz from the beginning
  }
};

onMounted(fetchQuizData);
</script>

<style scoped>
.quiz__title {
  color: black;
  padding-top: 15px;
  padding-bottom: 30px;
}

.quiz__image-container {
  margin-bottom: 20px;
}

.quiz__image {
  max-width: 100%;
}

.quiz__question {
  padding-bottom: 20px;
}

.quiz__answers {
  list-style-type: none;
  padding: 0;
}

.quiz__answer {
  margin-bottom: 10px;
}

.quiz__button {
  padding: 10px 20px;
  background-color: #fff;
  color: #0c0931;
  border: none;
  cursor: pointer;
  width: 100%;
  outline: none;
  font-size: 16px;
  line-height: 24px;
  font-family: 'Open Sans';
  font-weight: 300;
}

.quiz__button:hover {
  background-color: #effafe; /* Lighter grey on hover */
}

.quiz__button:focus {
  outline: 2px solid #009688; /* Replace with your preferred color */
}

.quiz__final {
  text-align: center;
}

.quiz__final-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin-top: 20px; /* Adjust spacing as needed */
}

.quiz__final-text {
  margin-top: 20px;
  font-size: 16px;
  line-height: 24px;
  font-family: 'Open Sans';
  color: #0c0931;
  font-weight: 300;
}

.quiz__loading {
  text-align: center;
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
  background-color: #fff;
  padding: 20px;
  width: 100%;
  max-width: 646px;
}
</style>
