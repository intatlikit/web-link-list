-- Run after 001_create_links.sql. Lets signed-in users add, edit, and reorder links.
--
-- IMPORTANT: any signed-in user can write. Turn OFF public sign-ups in
-- Supabase Dashboard > Authentication > Sign In / Providers ("Allow new users to sign up"),
-- then create your own account under Authentication > Users > Add user.

drop policy if exists "Authenticated can insert links" on public.links;
create policy "Authenticated can insert links"
  on public.links
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update links" on public.links;
create policy "Authenticated can update links"
  on public.links
  for update
  to authenticated
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

revoke execute on function public.reorder_links(bigint[]) from public, anon;
grant execute on function public.reorder_links(bigint[]) to authenticated;
