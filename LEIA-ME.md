# CentralOps — Central de Operações para Negócio Digital

Sua operação digital inteira em um só lugar: negócios, produtos, campanhas e tarefas.

## O que é

Um painel onde você enxerga e gerencia toda a sua operação de marketing digital:
- **Negócios** — cada operação que você toca (Educando, Pro Service, etc.)
- **Produtos** — tudo que você vende, com status, ticket, plataforma e todos os links (LP, checkout, criativo, PDF, área de membros)
- **Campanhas** — o que está rodando, com qual criativo, orçamento e CPA
- **Tarefas** — o que precisa ser feito, vinculado a cada negócio

## Como usar (VS Code)

1. Abra a pasta no VS Code
2. Instale a extensão **Live Server**
3. Botão direito no `index.html` → Open with Live Server

Funciona também só abrindo o `index.html` direto no navegador.

## Onde os dados ficam

Sem o Supabase configurado, tudo é salvo na memória do navegador (localStorage) — os dados ficam só no aparelho/navegador que você usa. Com o **Supabase configurado (abaixo)**, passa a ter **login por conta** e os dados ficam **na nuvem**, sincronizando entre celular e computador.

- Use o botão **Backup** (canto inferior da barra lateral) para baixar um arquivo de segurança quando quiser.

## Login + banco de dados na nuvem (Supabase) — JÁ ATIVO ✅

A integração do **Supabase ↔ Vercel** já está conectada e configurada:

- As credenciais (URL + chave anon) são lidas automaticamente das variáveis de ambiente da Vercel pela função `api/config.js` — **não há chave fixa no código**.
- A tabela `central_ops_data` e as políticas **RLS** já foram criadas (cada conta só enxerga os próprios dados).
- A tela de **login/cadastro** aparece sozinha ao abrir a plataforma publicada.

### Como funciona por dentro
- `api/config.js` → entrega URL + anon key (públicas) a partir das env vars `SUPABASE_URL` / `SUPABASE_ANON_KEY`.
- `index.html` → no boot, busca `/api/config`; se vier configurado, ativa o modo nuvem e exige login. Sem isso (ex: abrindo o arquivo localmente), roda em modo local com localStorage.
- `supabase-setup.sql` → o SQL da tabela + RLS, caso precise recriar manualmente no **SQL Editor** do Supabase.

### Ajustes recomendados no painel do Supabase
1. **Acesso instantâneo:** **Authentication → Providers → Email** → desligue *"Confirm email"* para entrar na hora ao criar a conta (sem confirmar por e-mail).
2. **(Opcional) Travar cadastros:** se a plataforma é só sua, crie sua conta e depois desligue *"Allow new users to sign up"* no mesmo lugar.

> A chave **anon public** é feita para ficar exposta ao navegador. Quem protege os dados é o **RLS**, que garante que cada usuário só acessa a própria linha.

### Trocar de projeto Supabase no futuro
Se um dia quiser apontar para outro projeto, basta atualizar as variáveis de ambiente na Vercel (ou preencher o bloco `window.CENTRALOPS_CONFIG` no topo do `index.html`) e rodar o `supabase-setup.sql` no novo projeto.

## Campanhas com métricas automáticas

Na tela **Campanhas**, ao criar ou editar uma campanha, agora existe a área **Integração automática**.

Você tem dois caminhos:

1. **Meta Ads direto pelo navegador**
   - Informe o **Campaign ID da Meta**.
   - Cole um **token de acesso da Meta** com permissão de leitura de anúncios/insights.
   - Clique em **Buscar dados** ao editar a campanha, ou marque **atualizar automaticamente ao abrir**.
   - A plataforma busca status, orçamento, gasto, cliques, CTR, conversões e CPA de hoje.

2. **URL externa**
   - Use quando tiver um backend/proxy seu.
   - Cole uma URL que retorne JSON.
   - Exemplo aceito:

```json
{
  "status": "rodando",
  "orcamento": 50,
  "cpa": 12.4,
  "gasto": 80,
  "cliques": 120,
  "ctr": 2.3,
  "conversoes": 6
}
```

### Observação importante

Para uso pessoal e validação, o token direto no navegador quebra o galho. Para vender para outras pessoas, o ideal é colocar isso em um backend, porque token salvo no navegador fica exposto para quem usa a máquina. A verificação oficial da Meta continua sendo o caminho certo para escalar como SaaS.

## Já vem com exemplo

Na primeira vez, dois negócios de exemplo (Educando e Pro Service) já aparecem para você ver como funciona. Pode editar ou excluir.

## Roadmap

### v1 (esta versão) — uso pessoal, validação
- Negócios, produtos, campanhas, tarefas
- Links/ativos por produto
- Backup manual

### v2 — quando validar e for vender
- ✅ Login por usuário (Supabase Auth)
- ✅ Banco de dados online (sincroniza entre celular e computador)
- ✅ Integração com Meta Ads (puxar métricas automaticamente)
- Integração com Cakto/Hotmart (puxar vendas)
- Relatórios e gráficos de faturamento
- Modelo recorrente (assinatura mensal)

## Sobre o modelo de negócio

A ideia: vender vitalício agora (R$ 47-67) para validar com pouca fricção. Quando a v2 com integrações estiver pronta e o produto for indispensável no dia a dia, migrar para recorrente (R$ 37-67/mês).

Você é o primeiro usuário — use de verdade com seus negócios. O que você sentir falta é exatamente o que os próximos clientes vão sentir.
