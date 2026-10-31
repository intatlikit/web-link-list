-- Run this in Supabase Dashboard > SQL Editor to create the `links` table.

create table if not exists public.links (
  id          bigint generated always as identity primary key,
  title       text        not null,
  url         text        not null,
  description text,
  sort_order  integer     not null default 0,
  is_active   boolean     not null default true,
  created_at  timestamptz not null default now()
);

-- The anon key ships in the client bundle, so RLS is what protects the data.
alter table public.links enable row level security;

drop policy if exists "Public can read active links" on public.links;
create policy "Public can read active links"
  on public.links
  for select
  to anon, authenticated
  using (is_active);

-- Seed data (same as src/data/links.ts)
insert into public.links (title, url, description, sort_order) values
  ('Harn-Tang', 'https://intatlikit.github.io/harn-tang/', 'A useful tool for bill splitting and shared expenses.', 1),
  ('Monthly Expense Calculator', 'https://intatlikit.github.io/monthly_expense_calculator/', 'Track and manage your monthly spending habits.', 2),
  ('Loan Calculator', 'https://intatlikit.github.io/loan-calculator/', 'Calculate your loan payments and interest easily.', 3),
  ('Text Converter', 'https://text-converter-bice-five.vercel.app/', 'A simple and efficient text converter tool.', 4),
  ('Saving Account Plan Calculator', 'https://intatlikit.github.io/saving_account_plan_calculator/', 'Plan your savings and visualize your financial growth.', 5),
  ('Android Chucker View', 'https://vb-android-chucker-viewer.web.app/', 'A web-based viewer for Android Chucker HTTP inspector logs.', 6),
  ('iOS Pulse View', 'https://amefuri.github.io/zloggerlens/', 'An API log inspector and viewer for iOS Pulse console logs.', 7);
