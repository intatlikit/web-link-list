<script setup lang="ts">
import type { LinkItem } from '../../types';

defineProps<{
  link: LinkItem;
}>();
</script>

<template>
  <a
    :href="link.url"
    target="_blank"
    rel="noopener noreferrer"
    class="link-card"
  >
    <h2 class="link-title">{{ link.title }}</h2>
    <p
      v-if="link.description"
      class="link-description"
    >
      {{ link.description }}
    </p>
    <div class="link-footer">
      <span class="link-url">{{ link.url }}</span>
      <span class="external-icon">↗</span>
    </div>
  </a>
</template>

<style scoped>
.link-card {
  background-color: var(--color-surface);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
  border: 1px solid var(--color-card-border);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  color: inherit;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-card);
  background-color: var(--color-surface-hover);
  border-color: var(--color-accent);
}

.link-title {
  margin: 0 0 0.75rem 0;
  color: var(--color-heading);
  font-size: 1.5rem;
}

.link-description {
  color: var(--color-description);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.link-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.link-url {
  font-family: monospace;
  color: var(--color-accent);
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 85%;
}

.external-icon {
  color: var(--color-accent);
  font-size: 1.2rem;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.link-card:hover .external-icon {
  opacity: 1;
}
</style>
