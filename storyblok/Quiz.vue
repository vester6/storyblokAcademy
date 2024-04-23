<template>
    <div class="quiz-container">
        <div class="quiz-content">
      <div v-if="currentQuestion">
       <div class="imagecontainer">
        <img class="question-image" v-if="currentQuestion.question_image" :src="currentQuestion.question_image.filename" alt="Question Image"></div>
        <h3>{{ currentQuestion.question_text }}</h3>
        <ul>
          <li v-for="answer in currentQuestion.answers" :key="answer._uid">
            <button class="button" @click="selectAnswer(answer)">{{ answer.answer_text }}</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading quiz or no quiz data available...</p>
      </div>
    </div>
    </div>
  </template>
  
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const currentQuestion = ref(null);

const fetchQuizData = async () => {
  try {
    const response = await axios.get('https://api.storyblok.com/v2/cdn/stories/home', {
      params: {
        version: 'draft',
        token: 'rNPzA9OYKH7bTADlOhVuWQtt' // Replace with your actual public token
      }
    });
    console.log("API Response Data:", response.data); // Log the whole response data

    const pageData = response.data.story.content;
    console.log("Page Data:", pageData); // Log the page data to inspect the structure

    // Find the quiz component within the body array
    const quizComponent = pageData.body.find(component => component.component === 'quiz');
    console.log("Quiz Component:", quizComponent);

    if (quizComponent && quizComponent.start_question && Array.isArray(quizComponent.start_question) && quizComponent.start_question.length > 0) {
      currentQuestion.value = quizComponent.start_question[0];
    } else {
      // Handle the case where start_question is not as expected
      console.error("Quiz component or start_question is not available or not in expected format", quizComponent);
      currentQuestion.value = null; // Or set some default state
    }
  } catch (error) {
    console.error('Error fetching quiz data:', error);
  }
};


const selectAnswer = (answer) => {
  if (answer.next_question && answer.next_question.length > 0) {
    currentQuestion.value = answer.next_question[0];
  } else {
    currentQuestion.value = { question_text: "End of the Quiz", answers: [] };
  }
};

onMounted(fetchQuizData);
</script>

<style scoped>
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