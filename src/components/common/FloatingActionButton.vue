<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  to: RouteLocationRaw;
  label: string;
}>();
</script>

<template>
  <RouterLink
    :to="to"
    class="fab"
    :aria-label="label"
    :title="label"
  >
    <slot />
  </RouterLink>
</template>

<style scoped>
.fab {
  position: fixed;
  right: calc(1.5rem + env(safe-area-inset-right));
  bottom: calc(1.5rem + env(safe-area-inset-bottom));
  z-index: 100;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent);
  color: hsl(0, 0%, 100%);
  box-shadow: var(--shadow-card);
  transition: transform 0.2s, box-shadow 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.fab:hover {
  transform: scale(1.08);
}

.fab:active {
  transform: scale(0.95);
}

.fab:focus-visible {
  outline: 3px solid var(--color-accent-ring);
  outline-offset: 3px;
}
</style>
