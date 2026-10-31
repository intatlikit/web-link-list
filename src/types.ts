export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
}

/** Row shape of the `links` table in Supabase (see supabase/schema.sql). */
export interface LinkRow {
  id: number;
  title: string;
  url: string;
  description: string | null;
}
