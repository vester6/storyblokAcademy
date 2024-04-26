<template>
  <div>
    <div v-editable="bullet" class="container">
      <div class="circle">
        <p class="number">{{ bullet.number }}</p>
      </div>
      <div class="bulletcontent" v-html="bulletcontent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({ bullet: Object });
const bulletcontent = computed(() => renderRichText(props.bullet.bullettext));
</script>

<style scoped>
.container {
  display: flex;
  margin-bottom: 30px;
}

.bulletcontent {
  margin-top: 4px;
}

.number {
  display: flex;
  align-items: center;
  font-family: "Open Sans";
  font-weight: 500;
  justify-content: center;
  margin: 0;
  height: 100%;
}

.circle {
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  background-color: #e2f5fc;
  margin-right: 15px;
}
</style>
