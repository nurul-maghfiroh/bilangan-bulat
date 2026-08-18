-- Math Quest: Supabase database
create extension if not exists pgcrypto;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  class_name text not null,
  submitted_at timestamptz not null default now(),
  score numeric(5,2) not null check (score >= 0 and score <= 100),
  correct_count integer not null check (correct_count >= 0 and correct_count <= 120),
  wrong_count integer not null check (wrong_count >= 0 and wrong_count <= 120),
  answers jsonb not null
);

alter table public.submissions enable row level security;

drop policy if exists "students can submit results" on public.submissions;
create policy "students can submit results"
on public.submissions
for insert
to anon
with check (
  length(trim(name)) between 1 and 100
  and length(trim(class_name)) between 1 and 30
  and score between 0 and 100
  and correct_count between 0 and 120
  and wrong_count between 0 and 120
  and jsonb_typeof(answers) = 'array'
);

-- Tidak ada SELECT policy untuk anon.
-- Admin membaca data melalui Edge Function menggunakan service role.
