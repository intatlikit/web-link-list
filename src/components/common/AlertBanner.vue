<script setup lang="ts">
defineProps<{
  message: string;
}>();

defineEmits<{
  dismiss: [];
}>();
</script>

<template>
  <div
    class="alert-banner"
    role="alert"
  >
    <span>{{ message }}</span>
    <button
      type="button"
      class="dismiss-button"
      aria-label="Dismiss"
      @click="$emit('dismiss')"
    >
      ✕
    </button>
  </div>
</template>

<style scoped>
.alert-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto 2rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-error);
  border-radius: 8px;
  color: var(--color-error);
  box-sizing: border-box;
}

.dismiss-button {
  background: none;
  border: none;
  color: inherit;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
}
</style>
