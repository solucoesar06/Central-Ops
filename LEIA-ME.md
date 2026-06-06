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

## Login + banco de dados na nuvem (Supabase)

Siga uma única vez para ativar contas e sincronização na nuvem. É grátis.

1. **Crie o projeto:** acesse [supabase.com](https://supabase.com) → *New project*. Dê um nome e uma senha de banco (guarde-a) e aguarde provisionar (~2 min).
2. **Crie a tabela:** no projeto, vá em **SQL Editor → New query**, abra o arquivo `supabase-setup.sql` deste repositório, **cole todo o conteúdo** e clique em **Run**.
3. **Pegue as chaves:** vá em **Project Settings → API** e copie:
   - **Project URL** (ex: `https://abcdefgh.supabase.co`)
   - **anon public** (a chave longa)
4. **Cole no app:** abra o `index.html`, no topo tem o bloco `window.CENTRALOPS_CONFIG`. Cole a URL em `SUPABASE_URL` e a chave em `SUPABASE_ANON_KEY`. Salve e publique (commit/push → a Vercel atualiza).
5. **(Recomendado) Acesso instantâneo:** em **Authentication → Providers → Email**, desligue *"Confirm email"* se quiser entrar na hora ao criar a conta (sem precisar confirmar por e-mail).
6. **(Opcional) Conta única:** se a plataforma é só sua, crie sua conta uma vez e depois desligue novos cadastros em **Authentication → Providers → Email → "Allow new users to sign up"**.

Pronto: a tela de **login** aparece automaticamente, e cada conta vê só os próprios dados (protegido por RLS — *Row Level Security*).

> A chave **anon public** pode ficar visível no código — ela é feita para isso. Quem protege os dados é o RLS, que garante que cada usuário só acessa a própria linha.

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
