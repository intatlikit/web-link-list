<script setup lang="ts">
defineProps<{
  version: string;
}>();
</script>

<template>
  <footer class="app-footer">
    <p>&copy; 2024 Link List App • v{{ version }} • Built with Vue, Vite & Supabase</p>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: clamp(2.5rem, 6vw, 4rem);
  padding: 2rem 0;
  color: var(--color-subtle);
  border-top: 1px solid var(--color-border);
  text-align: center;
}
</style>
