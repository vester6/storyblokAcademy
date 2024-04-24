<template>
    <div class="quiz-container">
      <div class="quiz-content">
        <h2>{{ blok.title }}</h2>
        <div v-if="currentQuestion">
          <div class="imagecontainer">
            <img class="question-image" v-if="currentQuestion.question_image" :src="currentQuestion.question_image.filename" alt="Question Image">
          </div>
          <h3>{{ currentQuestion.question_text }}</h3>
          <ul>
            <li v-for="answer in currentQuestion.answers" :key="answer._uid">
              <button class="button" @click="selectAnswer(answer)">{{ answer.answer_text }}</button>
            </li>
          </ul>
        </div>
        <div v-else-if="finalText">
          <p>{{ finalText }}</p>
          <img v-if="finalImage" :src="finalImage" alt="Ending Image" class="final-image"/>
          <button class="button" @click="restartQuiz">Restart Quiz</button>
        </div>
        <div v-else>
          <p>Loading quiz or no quiz data available...</p>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue';
  defineProps({ blok: Object });
  import axios from 'axios';
  
  const currentQuestion = ref(null);
  const finalText = ref(null); // Holds the text for the `finalText` field
  const finalImage = ref(null); // Holds the URL for the `finalImage`
  
  const fetchQuizData = async () => {
    try {
      const response = await axios.get('https://api.storyblok.com/v2/cdn/stories/home', {
        params: {
          version: 'draft',
          token: 'rNPzA9OYKH7bTADlOhVuWQtt' // Replace with your actual public token
        }
      });
  
      const pageData = response.data.story.content;
      const quizComponent = pageData.body.find(component => component.component === 'quiz');
  
      if (quizComponent && quizComponent.start_question && Array.isArray(quizComponent.start_question) && quizComponent.start_question.length > 0) {
        currentQuestion.value = quizComponent.start_question[0];
      } else {
        currentQuestion.value = null; // Or set some default state
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };
  
  const selectAnswer = (answer) => {
  // First, check if there are any follow-up questions
  if (answer.next_question && answer.next_question.length > 0) {
    currentQuestion.value = answer.next_question[0];
    finalText.value = null;  // Clear any final text
    finalImage.value = null; // Clear the final image
  } else {
    // If there are no follow-up questions, check for finalText
    if (answer.finalText) {
      finalText.value = answer.finalText;
      finalImage.value = answer.finalImage ? answer.finalImage.filename : null;
    } else {
      // If there is no finalText, provide a default completion message
      finalText.value = "Thank you for completing the quiz!";
      finalImage.value = null; // Ensure no image is displayed for the default message
    }
    currentQuestion.value = null; // Clear current question since we are at the end
  }
};

  
  const restartQuiz = () => {
    fetchQuizData(); // Resets the quiz to the first question
  };
  
  onMounted(fetchQuizData);
  </script>
  
  
  <style scoped>
  .final-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin-top: 20px; /* Adjust spacing as needed */
}
  .button {
    padding: 10px 20px;
    background-color: #fff;
    color: #0c0931;
    border: none;
    cursor: pointer;
    width: 100%;
    outline: none;
  }
  
  ul {
    list-style-type: none;
  }
  
  .button:hover {
    background-color: #effafe;; /* Lighter grey on hover */
  }
  
  .button:focus {
    outline: 2px solid #009688; /* Replace with your preferred color */
  }
  
  p {
    font-size: 16px;
    line-height: 24px;
    font-family: "Open Sans";
    color: #0c0931;
    font-weight: 300;
  }
  
  h3 {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  
  h2 {
    padding-bottom: 15px;
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
  
  .quiz-content {
    background-color: #fff;
    padding: 20px;
    width: 100%;
    max-width: 646px;
  }
  
  .question-image {
    max-width: 100%;
    height: 150px;
  }
  
  .imagecontainer {
    min-height: 150px;
  }
  </style>
  