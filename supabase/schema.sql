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



-- Admins: can moderate (delete) any post or comment.
-- Add an admin with: insert into public.admins (clerk_user_id) values ('user_xxx');
create table if not exists public.admins (
  clerk_user_id text primary key
);
alter table public.admins enable row level security;
drop policy if exists "Admins read self" on public.admins;
create policy "Admins read self" on public.admins
  for select using (clerk_user_id = (select auth.jwt()->>'sub'));

drop policy if exists "Admins delete any post" on public.posts;
create policy "Admins delete any post" on public.posts
  for delete using (
    exists (select 1 from public.admins where clerk_user_id = (select auth.jwt()->>'sub'))
  );
drop policy if exists "Admins delete any comment" on public.comments;
create policy "Admins delete any comment" on public.comments
  for delete using (
    exists (select 1 from public.admins where clerk_user_id = (select auth.jwt()->>'sub'))
  );

-- Class content: admin-authored updates and itinerary items shown on the private /fellows and /mentors pages.
create table if not exists public.class_updates (
  id uuid primary key default gen_random_uuid(),
  audience text not null check (audience in ('fellow', 'mentor')),
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);
alter table public.class_updates
  add column if not exists kind text not null default 'update' check (kind in ('update', 'itinerary'));
alter table public.class_updates add column if not exists event_date date;
create index if not exists class_updates_audience_idx on public.class_updates (audience, created_at desc);
alter table public.class_updates enable row level security;

-- Readable by admins and by users whose profile role matches the audience.
drop policy if exists "Read own audience updates" on public.class_updates;
create policy "Read own audience updates" on public.class_updates
  for select using (
    exists (select 1 from public.admins where clerk_user_id = (select auth.jwt()->>'sub'))
    or audience in (select role from public.profiles where clerk_user_id = (select auth.jwt()->>'sub'))
  );
drop policy if exists "Admins insert updates" on public.class_updates;
create policy "Admins insert updates" on public.class_updates
  for insert with check (
    exists (select 1 from public.admins where clerk_user_id = (select auth.jwt()->>'sub'))
  );
drop policy if exists "Admins delete updates" on public.class_updates;
create policy "Admins delete updates" on public.class_updates
  for delete using (
    exists (select 1 from public.admins where clerk_user_id = (select auth.jwt()->>'sub'))
  );

-- Private blogs: posts.audience is null for the public blog, or 'fellow' / 'mentor' for the members-only blogs.
alter table public.posts
  add column if not exists audience text check (audience in ('fellow', 'mentor'));
create index if not exists posts_audience_idx on public.posts (audience, created_at desc);

-- Public posts stay public; private posts are readable by admins and members of that audience.
drop policy if exists "Public read posts" on public.posts;
drop policy if exists "Read posts by audience" on public.posts;
create policy "Read posts by audience" on public.posts
  for select using (
    audience is null
    or exists (select 1 from public.admins where clerk_user_id = (select auth.jwt()->>'sub'))
    or audience in (select role from public.profiles where clerk_user_id = (select auth.jwt()->>'sub'))
  );

-- Comments follow the visibility of their post (the subquery is itself filtered by the posts policy).
drop policy if exists "Public read comments" on public.comments;
drop policy if exists "Read comments of visible posts" on public.comments;
create policy "Read comments of visible posts" on public.comments
  for select using (exists (select 1 from public.posts where posts.id = comments.post_id));

-- Only members of the audience (or admins) can create private posts.
drop policy if exists "Users create own posts" on public.posts;
create policy "Users create own posts" on public.posts
  for insert with check (
    author_id in (select id from public.profiles where clerk_user_id = (select auth.jwt()->>'sub'))
    and (
      audience is null
      or exists (select 1 from public.admins where clerk_user_id = (select auth.jwt()->>'sub'))
      or audience in (select role from public.profiles where clerk_user_id = (select auth.jwt()->>'sub'))
    )
  );

-- Comments can only be added to posts the user can see.
drop policy if exists "Users create own comments" on public.comments;
create policy "Users create own comments" on public.comments
  for insert with check (
    author_id in (select id from public.profiles where clerk_user_id = (select auth.jwt()->>'sub'))
    and exists (select 1 from public.posts where posts.id = comments.post_id)
  );
