<script setup lang="ts">
import LinkCard from './LinkCard.vue';
import type { LinkItem } from '../../types';

defineProps<{
  links: LinkItem[];
}>();
</script>

<template>
  <div class="card-grid">
    <LinkCard
      v-for="link in links"
      :key="link.id"
      :link="link"
    />
  </div>
</template>
