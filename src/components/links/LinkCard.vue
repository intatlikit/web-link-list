<script setup lang="ts">
import { computed } from 'vue';
import IconDotsVertical from '../icons/IconDotsVertical.vue';
import IconGrip from '../icons/IconGrip.vue';
import IconTrash from '../icons/IconTrash.vue';
import type { LinkItem } from '../../types';

const props = defineProps<{
  link: LinkItem;
  /** Show the drag handle. */
  sortable?: boolean;
}>();

const emit = defineEmits<{
  delete: [link: LinkItem];
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

    <!-- Action bar: drag handle on the left, delete + edit on the right -->
    <div class="card-actions">
      <span
        v-if="sortable"
        class="card-action drag-handle"
        title="Drag to reorder"
      >
        <IconGrip />
      </span>
      <div class="card-actions-end">
        <button
          type="button"
          class="card-action card-action-danger"
          :aria-label="`Delete ${link.title}`"
          title="Delete"
          @click="emit('delete', link)"
        >
          <IconTrash />
        </button>
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
  </div>
</template>

<style scoped>
.link-card {
  background-color: var(--color-surface);
  border-radius: 12px;
  border: 1px solid var(--color-card-border);
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-card);
  background-color: var(--color-surface-hover);
  border-color: var(--color-accent);
}

.link-card-link {
  flex: 1;
  padding: 1.5rem 1.5rem 1rem;
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
  display: flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  border-top: 1px solid var(--color-border);
}

.card-actions-end {
  /* Pushes edit + delete to the right whether or not the drag handle is shown */
  margin-left: auto;
  display: flex;
  gap: 0.25rem;
}

.card-action {
  /* 40px keeps a comfortable touch target on mobile */
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 8px;
  color: var(--color-muted);
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;
  -webkit-tap-highlight-color: transparent;
}

.card-action:hover {
  color: var(--color-accent);
  background-color: var(--color-accent-ring);
}

.card-action-danger:hover {
  color: var(--color-error);
  background-color: var(--color-error-ring);
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
