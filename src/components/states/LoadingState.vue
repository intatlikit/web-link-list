<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number;
  }>(),
  { count: 6 }
);
</script>

<template>
  <div
    class="card-grid"
    aria-busy="true"
    aria-label="Loading resources"
  >
    <div
      v-for="n in count"
      :key="n"
      class="skeleton-card"
    >
      <div class="skeleton-line skeleton-title" />
      <div class="skeleton-line" />
      <div class="skeleton-line skeleton-short" />
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  padding: 1.5rem;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-line {
  height: 0.9rem;
  border-radius: 4px;
  background-color: var(--color-border);
  animation: pulse 1.4s ease-in-out infinite;
}

.skeleton-title {
  height: 1.5rem;
  width: 60%;
}

.skeleton-short {
  width: 40%;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
