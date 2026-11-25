create extension if not exists pgcrypto;

create table if not exists public.technicians (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  trade text not null,
  city text,
  neighborhood text not null,
  phone text not null,
  experience integer not null default 0 check (experience >= 0 and experience <= 60),
  emergency boolean not null default false,
  description text not null,
  profile_photo text,
  verified boolean not null default false,
  recommended boolean not null default false,
  status text not null default 'pending'
    check (status in ('pending', 'published', 'hidden')),
  created_at timestamptz not null default now()
);

-- Mise à niveau sans suppression des profils déjà enregistrés.
alter table public.technicians add column if not exists city text;
alter table public.technicians add column if not exists profile_photo text;

-- Bucket public pour les photos de profil ; les envois passent par l'API serveur.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'technician-photos',
  'technician-photos',
  true,
  1500000,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.technicians enable row level security;

-- Les accès à la table et au stockage sont faits par les routes serveur avec la clé service role.
-- Ne jamais utiliser la clé service role dans le navigateur.
