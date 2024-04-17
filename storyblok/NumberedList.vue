<template>
  <div v-editable="blok" class="container">
    <div class="contentcontainer">
      <h3 class="container__title">{{ blok.headline }}</h3>
      <div v-html="content" class="content"></div>
      <br />
      <Bullet
        v-for="bullet in blok.bullets"
        :key="bullet._uid"
        :bullet="bullet"
      />
      <div v-html="contentend" class="contentend"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
const props = defineProps({ blok: Object });

const content = computed(() => renderRichText(props.blok.content));
const contentend = computed(() => renderRichText(props.blok.contentend));
</script>

<style scoped>
.container {
  background-color: #f9fdff;
  color: #0c0931;
  margin-bottom: 30px;
}

.content {
  margin-bottom: 15px;
}

.contentend {
  margin-top: 15px;
}

.contentcontainer {
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 16px;
  line-height: 24px;
  font-family: "Open Sans";
  font-weight: 300;
  max-width: 984px;
  margin: auto;
  padding: 60px;
}

h3.container__title {
  padding-bottom: 15px;
}

@media (max-width: 991px) {
  .container {
    padding: 0 0px;
  }
}

@media (max-width: 991px) {
  .container__title {
    max-width: 100%;
    padding-bottom: 15px;
  }
}

.container__description {
  margin: 15px 0 0 0px;
  width: 740px;
}

.container__description + .container__description {
  margin-top: 30px;
}

@media (max-width: 991px) {
  .container__description {
    max-width: 100%;
  }
}
</style>
