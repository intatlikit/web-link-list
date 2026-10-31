<script setup lang="ts">
withDefaults(
  defineProps<{
    message: string;
    title?: string;
  }>(),
  { title: 'Could not load resources.' }
);

defineEmits<{
  retry: [];
}>();
</script>

<template>
  <div
    class="error-state"
    role="alert"
  >
    <p class="error-title">
      {{ title }}
    </p>
    <p class="error-message">
      {{ message }}
    </p>
    <button
      type="button"
      class="retry-button"
      @click="$emit('retry')"
    >
      Try again
    </button>
  </div>
</template>

<style scoped>
.error-state {
  text-align: center;
  margin-top: 2rem;
}

.error-title {
  color: var(--color-error);
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
}

.error-message {
  color: var(--color-muted);
  font-family: monospace;
  margin: 0 0 1.5rem;
}

.retry-button {
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  border-radius: 50px;
  border: 1px solid var(--color-accent);
  background: none;
  color: var(--color-accent);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.retry-button:hover {
  background-color: var(--color-accent);
  color: hsl(0, 0%, 100%);
}
</style>
