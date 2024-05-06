<template>
  <section v-editable="blok" class="statement">
    <div v-html="richtextcontent" class="statement__content"></div>
  </section>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
const props = defineProps({ blok: Object });
const richtextcontent = computed(() =>
  renderRichText(props.blok.richtextstatement)
);
</script>

<style scoped>
.statement {
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

.statement > * {
  color: hsla(248, 61.8%, 11.37%, 0.4);

  background-clip: text;
  background-repeat: no-repeat;
  background-size: 50% 100%;
  background-image: linear-gradient(90deg, #0C0931, #0C0931);
  animation: scroll-reveal linear forwards;
  animation-timeline: view();
  animation-range-start: cover 0vh;
  animation-range-end: cover 50vh;
}

@keyframes scroll-reveal{
  to{background-size: 100% 100%;}
}

@media (max-width: 991px) {
  .statement {
    max-width: 100%;
    padding: 30 20px;
  }
}
</style>
