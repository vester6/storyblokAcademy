<template>
  <header class="w-full h-24 bg-[#f7f6fd]">
    <div class="container h-full mx-auto flex items-center justify-between">
      <NuxtLink to="/">
        <h1 class="text-[#50b0ae] text-3xl font-bold">Storyblok Nuxt</h1>
      </NuxtLink>
      <nav>
        <ul class="flex space-x-8 text-lg font-bold">
          <li>
            <NuxtLink to="/blog" class="hover:text-[#50b0ae]">Blog</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="hover:text-[#50b0ae]">About</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Header */
header {
  width: 100%;
  height: 6rem; /* Equivalent to h-24 in Tailwind CSS */
  background-color: #f7f6fd; /* Equivalent to bg-[#f7f6fd] in Tailwind CSS */
}

/* Container */
.container {
  height: 100%;
  margin: 0 auto; /* Equivalent to mx-auto in Tailwind CSS */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
h1 {
  color: #50b0ae; /* Equivalent to text-[#50b0ae] in Tailwind CSS */
  font-size: 1.875rem; /* Equivalent to text-3xl in Tailwind CSS */
  font-weight: bold; /* Equivalent to font-bold in Tailwind CSS */
}

/* Navigation */
nav ul {
  display: flex;
  gap: 2rem; /* Equivalent to space-x-8 in Tailwind CSS */
  font-size: 1.125rem; /* Equivalent to text-lg in Tailwind CSS */
  font-weight: bold;
}

/* Navigation links */
nav ul li a {
  color: inherit;
  text-decoration: none;
}

/* Hover effect on navigation links */
nav ul li a:hover {
  color: #50b0ae; /* Equivalent to hover:text-[#50b0ae] in Tailwind CSS */
}
</style>
