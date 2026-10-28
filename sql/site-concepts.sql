-- Supabase SQL Editor'da bir kez çalıştırın. Mevcut proje verileri değişmez.
-- Yetki yalnızca aşağıdaki e-postayla kayıtlı, doğrulanmış hesaba verilir.
begin;

do $$
begin
  if not exists (
    select 1 from auth.users
    where lower(email) = lower('yusufbasarann63@gmail.com')
      and email_confirmed_at is not null
  ) then
    raise exception 'Doğrulanmış yönetici hesabı bulunamadı. SQL içindeki e-posta, mevcut yönetici girişinde kullandığınız adres olmalı.';
  end if;
end
$$;

create table if not exists public.cv_site_concept_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.cv_site_concept_settings (
  id smallint primary key default 1 check (id = 1),
  preset text not null default 'normal'
    check (preset in ('normal', 'ramazan', 'kurban', 'national', 'april23', 'may19', 'july20', 'august30', 'october29', 'november15')),
  updated_at timestamptz not null default now()
);

alter table public.cv_site_concept_admins enable row level security;
alter table public.cv_site_concept_settings enable row level security;

revoke all on public.cv_site_concept_admins from public, anon, authenticated;
revoke all on public.cv_site_concept_settings from public, anon, authenticated;
grant select on public.cv_site_concept_admins to authenticated;
grant select on public.cv_site_concept_settings to anon, authenticated;
grant update (preset) on public.cv_site_concept_settings to authenticated;

insert into public.cv_site_concept_admins (user_id)
select id from auth.users
where lower(email) = lower('yusufbasarann63@gmail.com')
  and email_confirmed_at is not null
on conflict (user_id) do nothing;

-- Tekrar çalıştırmak seçilmiş konsepti sıfırlamaz.
insert into public.cv_site_concept_settings (id, preset)
values (1, 'normal') on conflict (id) do nothing;

drop policy if exists cv_concept_admin_self_read on public.cv_site_concept_admins;
create policy cv_concept_admin_self_read on public.cv_site_concept_admins
for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists cv_concept_public_read on public.cv_site_concept_settings;
create policy cv_concept_public_read on public.cv_site_concept_settings
for select to anon, authenticated using (id = 1);

drop policy if exists cv_concept_owner_update on public.cv_site_concept_settings;
create policy cv_concept_owner_update on public.cv_site_concept_settings
for update to authenticated
using (
  id = 1 and exists (
    select 1 from public.cv_site_concept_admins
    where user_id = (select auth.uid())
  )
)
with check (
  id = 1 and exists (
    select 1 from public.cv_site_concept_admins
    where user_id = (select auth.uid())
  )
);

create or replace function public.cv_concept_set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := pg_catalog.now();
  return new;
end
$$;
revoke all on function public.cv_concept_set_updated_at() from public, anon, authenticated;

drop trigger if exists cv_concept_updated_at on public.cv_site_concept_settings;
create trigger cv_concept_updated_at
before update on public.cv_site_concept_settings
for each row execute function public.cv_concept_set_updated_at();

notify pgrst, 'reload schema';
commit;

-- Sonuç normal veya daha önce seçtiğiniz konsept olmalı.
select id, preset, updated_at from public.cv_site_concept_settings;
