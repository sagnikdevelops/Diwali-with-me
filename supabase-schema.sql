-- ==============================================================================
-- SHUBH DEEPAVALI — SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this script in your Supabase Project's SQL Editor (https://app.supabase.com)
-- This creates the tables, row level security policies, and enables real-time sync
-- for "The Wall of Light" and "Release a Sky Lantern".
-- ==============================================================================

-- 1. Table: diyas (The Wall of Light)
create table if not exists public.diyas (
  id text primary key,
  name text not null,
  message text not null default '',
  style text not null default 'brass',
  is_public boolean not null default true,
  created_at bigint not null default (extract(epoch from now()) * 1000)::bigint
);

-- Enable Row Level Security
alter table public.diyas enable row level security;

-- Drop old policies if they exist
drop policy if exists "Public diyas are viewable by everyone" on public.diyas;
drop policy if exists "Anyone can insert a diya" on public.diyas;

-- Read policy: Anyone can view public diyas
create policy "Public diyas are viewable by everyone"
  on public.diyas for select
  using (is_public = true);

-- Insert policy: Anyone can light a diya
create policy "Anyone can insert a diya"
  on public.diyas for insert
  with check (true);

-- 2. Table: lanterns (The Wish Wall / Sky Lanterns)
create table if not exists public.lanterns (
  id text primary key,
  name text not null,
  wish text not null,
  color text not null default 'amber',
  is_public boolean not null default true,
  created_at bigint not null default (extract(epoch from now()) * 1000)::bigint
);

-- Enable Row Level Security
alter table public.lanterns enable row level security;

-- Drop old policies if they exist
drop policy if exists "Public lanterns are viewable by everyone" on public.lanterns;
drop policy if exists "Anyone can insert a lantern" on public.lanterns;

-- Read policy: Anyone can view public lanterns
create policy "Public lanterns are viewable by everyone"
  on public.lanterns for select
  using (is_public = true);

-- Insert policy: Anyone can release a lantern
create policy "Anyone can insert a lantern"
  on public.lanterns for insert
  with check (true);

-- 3. Enable Realtime publications (broadcasts new diyas & lanterns to all users live)
alter publication supabase_realtime add table public.diyas;
alter publication supabase_realtime add table public.lanterns;

