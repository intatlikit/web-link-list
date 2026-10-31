import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { links as seedLinks } from '../data/links';
import type { LinkInput, LinkItem, LinkRow } from '../types';

/** Low-level storage operations; ordering logic lives in linkService.ts. */
export interface LinkBackend {
  list(): Promise<LinkItem[]>;
  /** Returns the new item's id. Position is fixed afterwards via saveOrder. */
  insert(input: LinkInput): Promise<string>;
  update(id: string, input: LinkInput): Promise<void>;
  /** Persists the display order; `ids` must contain every listed item. */
  saveOrder(ids: string[]): Promise<void>;
}

const NOT_PERMITTED = 'You do not have permission to change links. Please sign in again.';

function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    title: row.title,
    url: row.url,
    description: row.description ?? undefined,
  };
}

function toRowInput(input: LinkInput) {
  return {
    title: input.title,
    url: input.url,
    description: input.description || null,
  };
}

function createSupabaseBackend(client: SupabaseClient): LinkBackend {
  return {
    async list() {
      const { data, error } = await client
        .from('links')
        .select('id, title, url, description')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (error) throw new Error(error.message);
      return (data as LinkRow[]).map(toLinkItem);
    },

    async insert(input) {
      const { data, error } = await client
        .from('links')
        .insert(toRowInput(input))
        .select('id')
        .single();
      if (error) throw new Error(error.message);
      return String((data as Pick<LinkRow, 'id'>).id);
    },

    async update(id, input) {
      // RLS silently skips rows it denies, so check that a row was actually updated.
      const { data, error } = await client
        .from('links')
        .update(toRowInput(input))
        .eq('id', Number(id))
        .select('id');
      if (error) throw new Error(error.message);
      if (data.length === 0) throw new Error(NOT_PERMITTED);
    },

    async saveOrder(ids) {
      const { data, error } = await client.rpc('reorder_links', {
        ordered_ids: ids.map(Number),
      });
      if (error) throw new Error(error.message);
      if (data !== ids.length) throw new Error(NOT_PERMITTED);
    },
  };
}

/** Used when Supabase is not configured (local dev). Data lives in localStorage. */
function createLocalBackend(): LinkBackend {
  const storageKey = 'web-link-list:links';

  const read = (): LinkItem[] => {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as LinkItem[]) : [...seedLinks];
  };
  const write = (links: LinkItem[]) => localStorage.setItem(storageKey, JSON.stringify(links));

  return {
    async list() {
      return read();
    },

    async insert(input) {
      const id = crypto.randomUUID();
      write([...read(), { id, ...input }]);
      return id;
    },

    async update(id, input) {
      const links = read();
      const index = links.findIndex((link) => link.id === id);
      if (index === -1) throw new Error('Item not found.');
      links[index] = { id, ...input };
      write(links);
    },

    async saveOrder(ids) {
      const byId = new Map(read().map((link) => [link.id, link]));
      write(ids.map((id) => byId.get(id)).filter((link): link is LinkItem => link !== undefined));
    },
  };
}

export const linkBackend: LinkBackend = supabase
  ? createSupabaseBackend(supabase)
  : createLocalBackend();
