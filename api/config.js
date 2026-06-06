// api/config.js — entrega as credenciais PÚBLICAS do Supabase para o front-end.
// Lê das variáveis de ambiente da Vercel (criadas pela integração do Supabase),
// assim não é preciso colar nada no index.html. A chave "anon" é pública por design
// (a segurança real é o RLS), então pode ser servida ao navegador.

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const e = process.env;
  const url =
    e.SUPABASE_URL ||
    e.NEXT_PUBLIC_SUPABASE_URL ||
    e.SUPABASE_PROJECT_URL ||
    e.VITE_SUPABASE_URL ||
    '';
  const anonKey =
    e.SUPABASE_ANON_KEY ||
    e.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    e.SUPABASE_KEY ||
    e.VITE_SUPABASE_ANON_KEY ||
    '';

  const body = { configured: !!(url && anonKey), url, anonKey };

  // ?diag=1 lista apenas os NOMES das variáveis (sem valores) para diagnóstico.
  if (req.query && (req.query.diag === '1' || req.query.diag === 'true')) {
    body.envNames = Object.keys(e).filter((k) => /SUPA|POSTGRES|DATABASE|NEXT_PUBLIC|VITE_/i.test(k));
    body.hasPostgres = !!(e.POSTGRES_URL_NON_POOLING || e.POSTGRES_URL || e.DATABASE_URL);
  }

  res.status(200).json(body);
};
