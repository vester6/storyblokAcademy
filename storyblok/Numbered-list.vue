<template>
  <div v-editable="blok" class="numbered-list">
    <div class="numbered-list__content-container">
      <h3 class="numbered-list__title">{{ blok.headline }}</h3>
      <div v-html="content" class="numbered-list__content"></div>
      <br />
      <Bullet
        v-for="bullet in blok.bullets"
        :key="bullet._uid"
        :bullet="bullet"
        class="numbered-list__bullet"
      />
      <div v-html="contentend" class="numbered-list__content-end"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
const props = defineProps({ blok: Object });

const content = computed(() => renderRichText(props.blok.content));
const contentend = computed(() => renderRichText(props.blok.contentend));
</script>

<style scoped>
.numbered-list {
  background-color: #f9fdff;
  color: #0c0931;
  margin-bottom: 30px;
}

.numbered-list__content-container {
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

.numbered-list__title {
  padding-bottom: 15px;
}

.numbered-list__content {
  margin-bottom: 15px;
}

.numbered-list__bullet {
  /* Style for the bullet element */
}

.numbered-list__content-end {
  margin-top: 15px;
}

@media (max-width: 991px) {
  .numbered-list {
    padding: 0 0px;
  }

  .numbered-list__title {
    max-width: 100%;
    padding-bottom: 15px;
  }
}
</style>
