import { onMounted, ref } from 'vue';
import { fetchLinks, reorderLinks } from '../services/linkService';
import { errorMessage } from '../lib/errors';
import type { LinkItem } from '../types';

export function useLinks() {
  const links = ref<LinkItem[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  /** Error from a background action (e.g. saving a new order) — data stays visible. */
  const actionError = ref<string | null>(null);

  async function loadLinks() {
    loading.value = true;
    error.value = null;
    try {
      links.value = await fetchLinks();
    } catch (e) {
      error.value = errorMessage(e);
    } finally {
      loading.value = false;
    }
  }

  /** Applies the new order immediately and rolls back if saving fails. */
  async function reorder(next: LinkItem[]) {
    const previous = links.value;
    links.value = next;
    actionError.value = null;
    try {
      await reorderLinks(next.map((link) => link.id));
    } catch (e) {
      links.value = previous;
      actionError.value = `Could not save the new order: ${errorMessage(e)}`;
    }
  }

  function clearActionError() {
    actionError.value = null;
  }

  onMounted(loadLinks);

  return { links, loading, error, actionError, loadLinks, reorder, clearActionError };
}
