-- Liwayway initial private-data schema
-- Apply this migration in the Supabase SQL editor after creating the project.
-- Do not expose the service-role key in browser code.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  school_email text,
  role text not null default 'user' check (role in ('user','professional','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.protect_profile_role()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and new.role is distinct from old.role then
    raise exception 'Profile role can only be changed by a trusted administrator.';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_role_before_update on public.profiles;
create trigger protect_profile_role_before_update
before update on public.profiles
for each row execute function public.protect_profile_role();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, school_email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create table if not exists public.consent_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_type text not null,
  policy_version text not null,
  consented_at timestamptz not null default now(),
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  entry_date date not null default current_date,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  preferred_professional text,
  consultation_type text not null,
  appointment_date date not null,
  preferred_time text not null,
  consultation_format text not null,
  reason text,
  notes text,
  status text not null default 'requested'
    check (status in ('requested','confirmed','rescheduled','cancelled','completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- These contain sensitive mental-health information. They are deliberately
-- excluded from Google Sheets and are visible only to their account owner
-- until verified professional assignment and access rules are implemented.
create table if not exists public.initial_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  responses jsonb not null,
  consent_record_id uuid references public.consent_records(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.post_counseling_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  appointment_id uuid references public.appointment_requests(id) on delete set null,
  responses jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists journal_entries_user_date_idx
  on public.journal_entries(user_id, entry_date desc);
create index if not exists appointment_requests_user_date_idx
  on public.appointment_requests(user_id, appointment_date desc);
create index if not exists initial_assessments_user_created_idx
  on public.initial_assessments(user_id, created_at desc);
create index if not exists post_assessments_user_created_idx
  on public.post_counseling_assessments(user_id, created_at desc);

drop trigger if exists journal_entries_set_updated_at on public.journal_entries;
create trigger journal_entries_set_updated_at before update on public.journal_entries
for each row execute function public.set_updated_at();

drop trigger if exists appointment_requests_set_updated_at on public.appointment_requests;
create trigger appointment_requests_set_updated_at before update on public.appointment_requests
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.consent_records enable row level security;
alter table public.journal_entries enable row level security;
alter table public.appointment_requests enable row level security;
alter table public.initial_assessments enable row level security;
alter table public.post_counseling_assessments enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles
for select to authenticated using (id = auth.uid());

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles
for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "Users can view own consent records" on public.consent_records;
create policy "Users can view own consent records" on public.consent_records
for select to authenticated using (user_id = auth.uid());

drop policy if exists "Users can record own consent" on public.consent_records;
create policy "Users can record own consent" on public.consent_records
for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "Users can view own journal entries" on public.journal_entries;
create policy "Users can view own journal entries" on public.journal_entries
for select to authenticated using (user_id = auth.uid());

drop policy if exists "Users can create own journal entries" on public.journal_entries;
create policy "Users can create own journal entries" on public.journal_entries
for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "Users can edit own journal entries" on public.journal_entries;
create policy "Users can edit own journal entries" on public.journal_entries
for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "Users can delete own journal entries" on public.journal_entries;
create policy "Users can delete own journal entries" on public.journal_entries
for delete to authenticated using (user_id = auth.uid());

drop policy if exists "Users can view own appointment requests" on public.appointment_requests;
create policy "Users can view own appointment requests" on public.appointment_requests
for select to authenticated using (user_id = auth.uid());

drop policy if exists "Users can create own appointment requests" on public.appointment_requests;
create policy "Users can create own appointment requests" on public.appointment_requests
for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "Users can cancel own appointment requests" on public.appointment_requests;
create policy "Users can cancel own appointment requests" on public.appointment_requests
for update to authenticated using (user_id = auth.uid())
with check (user_id = auth.uid() and status = 'cancelled');

drop policy if exists "Users can view own initial assessments" on public.initial_assessments;
create policy "Users can view own initial assessments" on public.initial_assessments
for select to authenticated using (user_id = auth.uid());

drop policy if exists "Users can submit own initial assessments" on public.initial_assessments;
create policy "Users can submit own initial assessments" on public.initial_assessments
for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "Users can view own post-counseling assessments" on public.post_counseling_assessments;
create policy "Users can view own post-counseling assessments" on public.post_counseling_assessments
for select to authenticated using (user_id = auth.uid());

drop policy if exists "Users can submit own post-counseling assessments" on public.post_counseling_assessments;
create policy "Users can submit own post-counseling assessments" on public.post_counseling_assessments
for insert to authenticated with check (user_id = auth.uid());

grant usage on schema public to authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert on public.consent_records to authenticated;
grant select, insert, update, delete on public.journal_entries to authenticated;
grant select, insert, update on public.appointment_requests to authenticated;
grant select, insert on public.initial_assessments to authenticated;
grant select, insert on public.post_counseling_assessments to authenticated;
