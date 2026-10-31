<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <header class="app-header">
    <h1>{{ title }}</h1>
    <p v-if="subtitle">
      {{ subtitle }}
    </p>
    <slot />
  </header>
</template>

<style scoped>
.app-header {
  margin-bottom: clamp(2rem, 6vw, 4rem);
  width: 100%;
  text-align: center;
}

h1 {
  font-size: clamp(2.5rem, 8vw, 4rem);
  line-height: 1.1;
  margin: 0 0 1rem 0;
}

p {
  color: var(--color-muted);
  font-size: clamp(1rem, 3vw, 1.25rem);
  max-width: 600px;
  margin: 0 auto;
}
</style>
