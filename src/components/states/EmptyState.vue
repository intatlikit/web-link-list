<script setup lang="ts">
defineProps<{
  query?: string;
}>();
</script>

<template>
  <p class="empty-state">
    <template v-if="query">
      No resources found matching "{{ query }}"
    </template>
    <template v-else>
      No resources available yet.
    </template>
  </p>
</template>

<style scoped>
.empty-state {
  text-align: center;
  color: var(--color-muted);
  font-size: 1.2rem;
  margin-top: 2rem;
}
</style>
