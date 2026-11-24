create extension if not exists pgcrypto;

create table if not exists public.technicians (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  trade text not null,
  neighborhood text not null,
  phone text not null,
  experience integer not null default 0 check (experience >= 0 and experience <= 60),
  emergency boolean not null default false,
  description text not null,
  verified boolean not null default false,
  recommended boolean not null default false,
  status text not null default 'pending'
    check (status in ('pending', 'published', 'hidden')),
  created_at timestamptz not null default now()
);

alter table public.technicians enable row level security;

-- Les accès à la table sont faits par les routes serveur avec la clé service role.
-- Ne jamais utiliser la clé service role dans le navigateur.
