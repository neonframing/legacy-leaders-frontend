-- Legacy Leaders Blog schema for Supabase
-- Run this in the Supabase SQL editor (or via `supabase db push`).
-- Requires enabling the Clerk third-party auth integration under
-- Supabase Dashboard > Authentication > Sign In / Providers > Clerk.

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  username text unique not null,
  display_name text not null,
  role text not null check (role in ('fellow', 'mentor')),
  bio text,
  avatar_url text,
  socials jsonb not null default '{}'::jsonb, -- e.g. { "instagram": "...", "linkedin": "...", "x": "..." }
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists comments_post_id_idx on public.comments (post_id, created_at);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;

-- Anyone can read profiles, posts, and comments (public blog).
drop policy if exists "Public read profiles" on public.profiles;
create policy "Public read profiles" on public.profiles for select using (true);
drop policy if exists "Public read posts" on public.posts;
create policy "Public read posts" on public.posts for select using (true);
drop policy if exists "Public read comments" on public.comments;
create policy "Public read comments" on public.comments for select using (true);

-- A signed-in Clerk user can only insert/update their own profile.
drop policy if exists "Users manage own profile" on public.profiles;
create policy "Users manage own profile" on public.profiles
  for insert with check (clerk_user_id = (select auth.jwt()->>'sub'));
drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile" on public.profiles
  for update using (clerk_user_id = (select auth.jwt()->>'sub'));

-- A signed-in Clerk user can only create/edit posts under their own profile.
drop policy if exists "Users create own posts" on public.posts;
create policy "Users create own posts" on public.posts
  for insert with check (
    author_id in (select id from public.profiles where clerk_user_id = (select auth.jwt()->>'sub'))
  );
drop policy if exists "Users update own posts" on public.posts;
create policy "Users update own posts" on public.posts
  for update using (
    author_id in (select id from public.profiles where clerk_user_id = (select auth.jwt()->>'sub'))
  );
drop policy if exists "Users delete own posts" on public.posts;
create policy "Users delete own posts" on public.posts
  for delete using (
    author_id in (select id from public.profiles where clerk_user_id = (select auth.jwt()->>'sub'))
  );

-- Any signed-in Clerk user can comment as themselves.
drop policy if exists "Users create own comments" on public.comments;
create policy "Users create own comments" on public.comments
  for insert with check (
    author_id in (select id from public.profiles where clerk_user_id = (select auth.jwt()->>'sub'))
  );
drop policy if exists "Users delete own comments" on public.comments;
create policy "Users delete own comments" on public.comments
  for delete using (
    author_id in (select id from public.profiles where clerk_user_id = (select auth.jwt()->>'sub'))
  );

-- Storage bucket for cover images uploaded from the "New Post" form.
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read blog images" on storage.objects;
create policy "Public read blog images" on storage.objects
  for select using (bucket_id = 'blog-images');
drop policy if exists "Signed-in users upload blog images" on storage.objects;
create policy "Signed-in users upload blog images" on storage.objects
  for insert with check (bucket_id = 'blog-images' and (select auth.jwt()->>'sub') is not null);


