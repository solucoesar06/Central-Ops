-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  CentralOps · RESET — zera os dados de TODAS as contas             ║
-- ║  Cole no Supabase → SQL Editor → New query → Run.                  ║
-- ║  Não apaga usuários/logins, apenas os dados (produtos, negócios,   ║
-- ║  campanhas, tarefas). Cada conta volta vazia.                      ║
-- ╚══════════════════════════════════════════════════════════════════╝

truncate table public.central_ops_data;

-- (opcional) Conferir que esvaziou:
-- select count(*) from public.central_ops_data;
