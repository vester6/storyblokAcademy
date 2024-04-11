<template>
  <div v-editable="blok" class="">
    {{ blok.headline }}
  </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>
