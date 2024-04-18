<template>
   
      <div class="content-wrapper":class="gradients" >
        <div class="textcontainer":class="layouts">
          <div class="bodytext"  v-html="bodytext"></div>
        </div>
        <img 
          class="content-image"
          v-if="blok.image"
          :src="blok.image.filename"
          :alt="blok.image.alt"
        />
    </div>
   
  </template>
  
  <script setup>
  import { ref } from "vue";
  const props = defineProps({ blok: Object });
  const bodytext = computed(() => renderRichText(props.blok.bodytext));
  
  const layouts = computed(() => {
    return props.blok.layout === "constrained" ? "textcontainer" : "textcontainer2";
  });
  const gradients = computed(() => {
    return props.blok.layout === "constrained" ? "content-wrapper" : "content-wrapper2";
  });
  </script>
  
  <style scoped>

  .textcontainer {
    display: flex;
    justify-content: left;
    margin: auto;
    width: 984px;
  }
  .textcontainer2 {
    display: flex;
    justify-content: right;
    margin: auto;
    width: 984px;
  }
  
  .bodytext {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.75);
    max-width: 492px;
  }

  
  .content-wrapper {
  display: flex; 
  position: relative;
  overflow: hidden;
  min-height: 450px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: Oscine, sans-serif;
  font-size: 22px;
  color: #0c0931;
  font-weight: 300;
  line-height: 27px;
  background: rgb(245,251,255);
background: linear-gradient(90deg, rgba(245,251,255,0.95) 20%, rgba(245,251,255,0.8) 63%, rgba(245,251,255,0) 100%);
}
.content-wrapper2 {
  display: flex; 
  position: relative;
  overflow: hidden;
  min-height: 450px;
  width: 100%;
  font-family: Oscine, sans-serif;
  font-size: 22px;
  color: #0c0931;
  font-weight: 300;
  line-height: 27px;
  background: rgb(245,251,255);
background: linear-gradient(270deg, rgba(245,251,255,0.95) 20%, rgba(245,251,255,0.8) 63%, rgba(245,251,255,0) 100%);
}
  
  @media (max-width: 991px) {
    .content-wrapper {
      padding: 0 60px; /* Adjusted padding */
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
  