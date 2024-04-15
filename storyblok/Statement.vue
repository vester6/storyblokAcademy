<template>
  <div class="container">
    <div v-html="richtextcontent" class="richtextstyle"></div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
const props = defineProps({ blok: Object });

// Function `renderRichText` should be defined or imported if it processes richtext content
const richtextcontent = computed(() =>
  renderRichText(props.blok.richtextstatement)
);
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fdff;
  font-family: "Oscine";
  font-size: 22px;
  line-height: 27px;
  margin-top: 30px;
  margin-bottom: 30px;
  color: #0c0931;
  text-align: center;
  padding: 60px;
}

@media (max-width: 991px) {
  .container {
    max-width: 100%;
    padding: 30 20px;
  }
}
</style>
