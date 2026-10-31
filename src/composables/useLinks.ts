import { onMounted, ref } from 'vue';
import { supabase } from '../lib/supabase';
import { links as localLinks } from '../data/links';
import type { LinkItem, LinkRow } from '../types';

function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    title: row.title,
    url: row.url,
    description: row.description ?? undefined,
  };
}

export function useLinks() {
  const links = ref<LinkItem[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function fetchLinks() {
    loading.value = true;
    error.value = null;

    if (!supabase) {
      links.value = localLinks;
      loading.value = false;
      return;
    }

    const { data, error: queryError } = await supabase
      .from('links')
      .select('id, title, url, description')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (queryError) {
      error.value = queryError.message;
    } else {
      links.value = (data as LinkRow[]).map(toLinkItem);
    }
    loading.value = false;
  }

  onMounted(fetchLinks);

  return { links, loading, error, fetchLinks };
}
