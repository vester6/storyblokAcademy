<script setup>
const story = await useAsyncStoryblok("home", { version: "draft" });
</script>

<template>
  <Vuedrag />
  <StoryblokComponent v-if="story" :blok="story.content" />

</template>
