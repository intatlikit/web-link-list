-- Run after 002_public_editing.sql. Lets anyone delete a link from the site.
--
-- Soft delete: the row is hidden (is_active = false), not removed, so anything deleted
-- by mistake or by a vandal can be restored in Table Editor by setting is_active = true.
--
-- security definer: anon still cannot write is_active directly (see 002); this function
-- is the only way to hide a row, and it can only hide — never restore or edit.

create or replace function public.delete_link(link_id bigint)
returns integer
language sql
security definer
set search_path = ''
as $$
  with updated as (
    update public.links
    set is_active = false
    where id = link_id and is_active
    returning 1
  )
  select count(*)::integer from updated;
$$;

revoke execute on function public.delete_link(bigint) from public;
grant execute on function public.delete_link(bigint) to anon, authenticated;
