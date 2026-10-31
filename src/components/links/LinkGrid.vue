<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDraggable } from 'vue-draggable-plus';
import LinkCard from './LinkCard.vue';
import type { LinkItem } from '../../types';

const props = defineProps<{
  links: LinkItem[];
  /** Enable drag & drop reordering (mouse and touch). */
  sortable?: boolean;
}>();

const emit = defineEmits<{
  reorder: [links: LinkItem[]];
}>();

const gridRef = ref<HTMLElement | null>(null);

// Local copy for SortableJS to reorder; the parent owns the real order.
const items = ref<LinkItem[]>([...props.links]);
watch(
  () => props.links,
  (next) => {
    items.value = [...next];
  }
);

useDraggable(
  gridRef,
  items,
  computed(() => ({
    disabled: !props.sortable,
    handle: '.drag-handle',
    animation: 200,
    ghostClass: 'drag-ghost',
    chosenClass: 'drag-chosen',
    // Runs after vue-draggable-plus has written the new order into `items`
    onUpdate: () => emit('reorder', items.value),
  }))
);
</script>

<template>
  <div
    ref="gridRef"
    class="card-grid"
  >
    <LinkCard
      v-for="link in items"
      :key="link.id"
      :link="link"
      :sortable="sortable"
    />
  </div>
</template>

<style scoped>
.drag-ghost {
  opacity: 0.35;
}

.drag-chosen {
  box-shadow: var(--shadow-card);
  border-color: var(--color-accent);
}
</style>
