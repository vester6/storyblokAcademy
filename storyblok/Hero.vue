<template>
  <div
    v-editable="blok"
    class="hero-container-layout1 mirsaicdark"
    :class="heroClasses"
  >
    <div class="hero-content">
      <h1>{{ blok.headline }}</h1>
      <h2>{{ blok.subheadline }}</h2>
    </div>
    <!-- <img
      :src="blok.backgroundimage.filename"
      :alt="blok.backgroundimage.alt"
      class="hero-background"
    /> -->
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object });

const heroClasses = computed(() => {
  return props.blok.layout === "constrained" ? "hero-container-layout2" : "";
});
</script>

<style scoped>
/* Regular CSS equivalent */
.hero-container-layout1 {
  min-height: 300px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 1.5rem auto;
  border-radius: 5px;
  overflow: hidden;
}

.mirsaicdark {
  background-image: url(https://a.storyblok.com/f/230581/1202x489/e76c5d687c/mirsaic-dark.svg?cv=1695126163753),
    linear-gradient(155deg, #143a67, #0c0931);
  background-position: top;
  background-repeat: repeat-x, no-repeat;
  background-size: 984px, cover;
}

.hero-container-layout2 {
  min-height: 500px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 10;
  width: 100%;
  text-align: left;
  padding: 1.5rem 0;
  display: grid;
  max-width: 984px;
  padding-top: 30px;
}

.hero-content h1 {
  color: white;

  margin-bottom: 0.75rem;
}

.hero-content h2 {
  font-size: 2.25rem;
  color: white;
  font-weight: lighter;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
