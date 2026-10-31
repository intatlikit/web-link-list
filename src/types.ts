export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
}

/** Editable fields of a link (used by the add/edit form). */
export type LinkInput = Omit<LinkItem, 'id'>;

/** Row shape of the `links` table in Supabase (see supabase/migrations). */
export interface LinkRow {
  id: number;
  title: string;
  url: string;
  description: string | null;
}
