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
        <div class="option">
          <input type="radio" id="option1" name="quiz_option" value="0" v-model="selectedOption">
          <label :class="{ 'selected': selectedOption === '0' }" for="option1">Router</label>
        </div>
        <div class="option"> 
          <input type="radio" id="option2" name="quiz_option" value="1" v-model="selectedOption">
          <label :class="{ 'selected': selectedOption === '1' }" for="option2">Modem</label>
        </div>
        <div class="option">
          <input type="radio" id="option3" name="quiz_option" value="2" v-model="selectedOption">
          <label :class="{ 'selected': selectedOption === '2' }" for="option3">Computer</label>
        </div>
        <div class="option">
          <input type="radio" id="option4" name="quiz_option" value="3" v-model="selectedOption">
          <label :class="{ 'selected': selectedOption === '3' }" for="option4">Wireless Access Point</label>
        </div>
        <div class="submit-container">
          <input type="submit" value="Submit" class="submit-button">
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
    defineProps({ blok: Object });
    let selectedOption = null;
  
    const submitQuiz = () => {
      console.log(`Selected option value: ${selectedOption}`);
      // Add more logic as required
    };
  </script>
  
  <style scoped>
h3 {
    padding-bottom: 15px;
}

  img {
    width:100%;
  }
    p, label {
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
      background-color: #2084C9;
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
  
    /* Style for selected option */
    .selected {
      color: #2084c9;
    }
  </style>
  