-- Run after 001_create_links.sql. Lets anyone (no sign-in) add, edit, and reorder links.
-- Safe to re-run; also replaces the earlier sign-in-only policies if they exist.
-- Links cannot be deleted or hidden from the site (no DELETE privilege, is_active not writable).

-- Data guards: with public writes, the database is the only thing enforcing these.
-- Blocks `javascript:` and other non-web URLs, which would run code when a card is clicked.
alter table public.links drop constraint if exists links_url_http;
alter table public.links add constraint links_url_http
  check (url ~* '^https?://' and char_length(url) <= 2000);

alter table public.links drop constraint if exists links_text_length;
alter table public.links add constraint links_text_length
  check (
    char_length(btrim(title)) between 1 and 100
    and (description is null or char_length(description) <= 300)
  );

-- Column-level privileges: Supabase grants ALL on public tables to anon/authenticated by default.
-- Restrict writes to the columns the site edits, so nobody can hide links (is_active = false)
-- or rewrite created_at via the API. TRUNCATE is not covered by RLS, so revoke it too.
revoke insert, update, delete, truncate on public.links from anon, authenticated;
grant insert (title, url, description) on public.links to anon, authenticated;
grant update (title, url, description, sort_order) on public.links to anon, authenticated;

drop policy if exists "Authenticated can insert links" on public.links;
drop policy if exists "Authenticated can update links" on public.links;

drop policy if exists "Anyone can insert links" on public.links;
create policy "Anyone can insert links"
  on public.links
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Anyone can update links" on public.links;
create policy "Anyone can update links"
  on public.links
  for update
  to anon, authenticated
  using (true)
  with check (true);

-- Rewrites sort_order to match the given id order (1-based) in one request.
-- security invoker = RLS still applies; returns the number of rows updated.
create or replace function public.reorder_links(ordered_ids bigint[])
returns integer
language sql
security invoker
set search_path = ''
as $$
  with updated as (
    update public.links as l
    set sort_order = t.ord
    from unnest(ordered_ids) with ordinality as t(id, ord)
    where l.id = t.id
    returning 1
  )
  select count(*)::integer from updated;
$$;

revoke execute on function public.reorder_links(bigint[]) from public;
grant execute on function public.reorder_links(bigint[]) to anon, authenticated;
