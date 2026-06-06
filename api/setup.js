// api/setup.js — cria/atualiza a tabela central_ops_data e as políticas RLS.
// Idempotente (pode rodar quantas vezes quiser, não apaga dados).
// Use uma vez via: /api/setup?run=centralops
const { Client } = require('pg');

const SQL = `
create table if not exists public.central_ops_data (
  user_id    uuid        primary key references auth.users(id) on delete cascade,
  data       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.central_ops_data enable row level security;

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
`;

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!req.query || req.query.run !== 'centralops') {
    return res.status(400).json({ ok: false, message: 'Adicione ?run=centralops à URL para executar a configuração.' });
  }
  let conn = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!conn) {
    return res.status(500).json({ ok: false, message: 'Sem string de conexão Postgres nas variáveis de ambiente.' });
  }
  // remove sslmode da string para que nossa config ssl (rejectUnauthorized:false) seja aplicada
  conn = conn.replace(/[?&]sslmode=[^&]*/gi, '');
  const client = new Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    await client.query(SQL);
    await client.end();
    return res.status(200).json({ ok: true, message: 'Tabela central_ops_data e políticas RLS criadas/atualizadas com sucesso.' });
  } catch (e) {
    try { await client.end(); } catch (_) {}
    return res.status(500).json({ ok: false, message: (e && e.message) || 'Erro ao executar o SQL.' });
  }
};
