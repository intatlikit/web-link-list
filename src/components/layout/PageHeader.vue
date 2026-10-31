<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  title: string;
  backTo: RouteLocationRaw;
}>();
</script>

<template>
  <header class="page-header">
    <RouterLink
      :to="backTo"
      class="back-link"
    >
      ← Back
    </RouterLink>
    <h1>{{ title }}</h1>
  </header>
</template>

<style scoped>
.page-header {
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
}

.back-link {
  color: var(--color-accent);
  text-decoration: none;
  font-size: 1rem;
}

.back-link:hover {
  text-decoration: underline;
}

h1 {
  font-size: clamp(2rem, 6vw, 2.75rem);
  line-height: 1.1;
  margin: 1rem 0 0;
}
</style>
