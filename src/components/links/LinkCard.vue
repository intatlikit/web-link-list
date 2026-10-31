<script setup lang="ts">
import IconDotsVertical from '../icons/IconDotsVertical.vue';
import IconGrip from '../icons/IconGrip.vue';
import { computed } from 'vue';
import type { LinkItem } from '../../types';

const props = defineProps<{
  link: LinkItem;
  /** Show the drag handle. */
  sortable?: boolean;
}>();

// Defense in depth: the DB already rejects non-http(s) URLs, but never render
// `javascript:` or other schemes as a clickable href.
const safeHref = computed(() => (/^https?:\/\//i.test(props.link.url) ? props.link.url : undefined));
</script>

<template>
  <div class="link-card">
    <a
      :href="safeHref"
      target="_blank"
      rel="noopener noreferrer"
      class="link-card-link"
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

    <div class="card-actions">
      <span
        v-if="sortable"
        class="card-action drag-handle"
        title="Drag to reorder"
      >
        <IconGrip />
      </span>
      <RouterLink
        :to="{ name: 'link-edit', params: { id: link.id } }"
        class="card-action"
        :aria-label="`Edit ${link.title}`"
        title="Edit"
      >
        <IconDotsVertical />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.link-card {
  position: relative;
  background-color: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
  display: flex;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-card);
  background-color: var(--color-surface-hover);
  border-color: var(--color-accent);
}

.link-card-link {
  flex: 1;
  padding: 1.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  color: inherit;
  min-width: 0;
}

.link-title {
  margin: 0 0 0.75rem 0;
  color: var(--color-heading);
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  overflow-wrap: anywhere;
  /* Keep the title clear of the action buttons */
  padding-right: 4.5rem;
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

.card-actions {
  position: absolute;
  top: 0.75rem;
  right: 0.5rem;
  display: flex;
  gap: 0.25rem;
}

.card-action {
  /* 40px keeps a comfortable touch target on mobile */
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--color-muted);
  transition: color 0.2s, background-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.card-action:hover {
  color: var(--color-accent);
  background-color: var(--color-accent-ring);
}

.drag-handle {
  cursor: grab;
  /* Lets SortableJS receive touch moves instead of the page scrolling */
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}

.drag-handle:active {
  cursor: grabbing;
}
</style>
