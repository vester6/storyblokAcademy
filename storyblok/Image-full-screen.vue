<template>
    <section class="content-section">
      <article class="content-article" :class="layouts">
        <div class="textcontainer">
          <div class="bodytext" v-html="bodytext"></div>
        </div>
        <img 
          class="content-image"
          v-if="blok.image"
          :src="blok.image.filename"
          :alt="blok.image.alt"
        />
      </article>
    </section>
  </template>
  
  <script setup>
  import { ref } from "vue";
  const props = defineProps({ blok: Object });
  const bodytext = computed(() => renderRichText(props.blok.bodytext));
  
  const layouts = computed(() => {
    return props.blok.layout === "constrained" ? "text-and-image-container" : "text-and-image-container2";
  });
  </script>
  
  <style scoped>
  .textcontainer {
    width: 984px;
  }
  
  .bodytext {
    max-width: 431px;
    margin: auto;
  }
  
  .content-article {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.75);
    font-family: Oscine, sans-serif;
    position: relative;
    overflow: hidden;
    min-height: 450px;
    width: 100%;
    padding: 0 60px; /* Adjusted padding */
    font-size: 22px;
    color: #0c0931;
    font-weight: 300;
    line-height: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  @media (max-width: 991px) {
    .content-article {
      padding: 0 20px; /* Adjusted padding */
    }
  }
  
  .content-image {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  </style>
  