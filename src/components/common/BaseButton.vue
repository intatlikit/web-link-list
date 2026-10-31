<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger' | 'danger-outline';
    type?: 'button' | 'submit';
  }>(),
  { variant: 'primary', type: 'button' }
);
</script>

<template>
  <button
    :type="type"
    class="button"
    :class="`button-${variant}`"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 0.7rem 1.5rem;
  min-height: 44px;
  font-size: 1rem;
  font-family: inherit;
  border-radius: 50px;
  border: 1px solid var(--color-accent);
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.2s, color 0.2s;
}

.button:disabled {
  opacity: 0.6;
  cursor: progress;
}

.button-primary {
  background-color: var(--color-accent);
  color: hsl(0, 0%, 100%);
}

.button-secondary {
  background: none;
  color: var(--color-accent);
}

.button-danger {
  background-color: var(--color-error);
  border-color: var(--color-error);
  color: hsl(0, 0%, 100%);
}

.button-danger-outline {
  background: none;
  border-color: var(--color-error);
  color: var(--color-error);
}

.button-danger-outline:not(:disabled):hover {
  background-color: var(--color-error-ring);
}
</style>
