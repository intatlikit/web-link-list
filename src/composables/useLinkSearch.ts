import { computed, ref, type Ref } from 'vue';
import type { LinkItem } from '../types';

export function useLinkSearch(links: Ref<LinkItem[]>) {
  const searchQuery = ref('');

  const filteredLinks = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return links.value;
    return links.value.filter(
      (link) =>
        link.title.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query)
    );
  });

  return { searchQuery, filteredLinks };
}
