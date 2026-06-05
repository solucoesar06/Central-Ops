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

Tudo é salvo na memória do navegador (localStorage). Os dados ficam no aparelho/navegador que você usa. Por isso:
- Use sempre o mesmo navegador para ter seus dados
- Use o botão **Backup** (canto superior) regularmente para baixar um arquivo de segurança
- Esse backup é a base para quando migrarmos para banco de dados online (v2)

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
- Banco de dados online (sincroniza entre celular e computador)
- Login por usuário
- Integração com Meta Ads (puxar métricas automaticamente)
- Integração com Cakto/Hotmart (puxar vendas)
- Relatórios e gráficos de faturamento
- Modelo recorrente (assinatura mensal)

## Sobre o modelo de negócio

A ideia: vender vitalício agora (R$ 47-67) para validar com pouca fricção. Quando a v2 com integrações estiver pronta e o produto for indispensável no dia a dia, migrar para recorrente (R$ 37-67/mês).

Você é o primeiro usuário — use de verdade com seus negócios. O que você sentir falta é exatamente o que os próximos clientes vão sentir.
