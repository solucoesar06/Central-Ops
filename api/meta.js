// api/meta.js — Função serverless (Vercel) que coleta métricas da Meta no servidor.
// Roda no backend para evitar CORS e não expor o token nas chamadas do navegador.
// Aceita POST { campaignId, token, datePreset } ou GET ?campaignId=&token=&datePreset=
// Se "token" não for enviado, usa a variável de ambiente META_ACCESS_TOKEN (opcional).

const GRAPH = 'https://graph.facebook.com/v19.0/';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const src = req.method === 'POST' ? (req.body || {}) : (req.query || {});
    const campaignId = String(src.campaignId || '').trim();
    const datePreset = String(src.datePreset || 'last_30d').trim();
    const token = String(src.token || process.env.META_ACCESS_TOKEN || '').trim();

    if (!campaignId) return res.status(400).json({ error: { message: 'Informe o Campaign ID da Meta.' } });
    if (!token) return res.status(400).json({ error: { message: 'Token da Meta ausente. Cole o token no formulário ou configure META_ACCESS_TOKEN na Vercel.' } });

    const id = encodeURIComponent(campaignId);
    const tk = encodeURIComponent(token);
    const infoUrl = GRAPH + id + '?fields=name,status,effective_status,daily_budget&access_token=' + tk;
    const insUrl = GRAPH + id + '/insights?date_preset=' + encodeURIComponent(datePreset) +
      '&fields=spend,impressions,clicks,ctr,cpc,cpm,actions,action_values,cost_per_action_type&access_token=' + tk;

    const [infoR, insR] = await Promise.all([fetch(infoUrl), fetch(insUrl)]);
    const info = await infoR.json().catch(() => ({}));
    const ins = await insR.json().catch(() => ({}));

    if (info && info.error) return res.status(infoR.status || 400).json({ error: info.error });
    if (ins && ins.error) return res.status(insR.status || 400).json({ error: ins.error });

    return res.status(200).json({
      campaign: info,
      insights: (ins && ins.data && ins.data[0]) || {}
    });
  } catch (e) {
    return res.status(500).json({ error: { message: (e && e.message) || 'Erro interno ao consultar a Meta.' } });
  }
};
