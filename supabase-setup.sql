-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  CentralOps · Configuração do banco de dados no Supabase           ║
-- ║  Cole TUDO isto no Supabase → SQL Editor → New query → Run.        ║
-- ╚══════════════════════════════════════════════════════════════════╝

-- Tabela única: guarda todos os dados de cada usuário (um registro por conta).
create table if not exists public.central_ops_data (
  user_id    uuid        primary key references auth.users(id) on delete cascade,
  data       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Liga a segurança por linha (cada um só enxerga o próprio registro).
alter table public.central_ops_data enable row level security;

-- Políticas: o dono (auth.uid()) pode ler, criar e atualizar a própria linha.
drop policy if exists "owner_select" on public.central_ops_data;
create policy "owner_select" on public.central_ops_data
  for select using (auth.uid() = user_id);

drop policy if exists "owner_insert" on public.central_ops_data;
create policy "owner_insert" on public.central_ops_data
  for insert with check (auth.uid() = user_id);

drop policy if exists "owner_update" on public.central_ops_data;
create policy "owner_update" on public.central_ops_data
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "owner_delete" on public.central_ops_data;
create policy "owner_delete" on public.central_ops_data
  for delete using (auth.uid() = user_id);
