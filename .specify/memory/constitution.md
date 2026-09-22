<!--
Sync Impact Report
- Version change: (template) → 1.0.0
- Modified principles: all placeholders replaced (initial ratification)
- Added sections: Technology Stack, Development Workflow & Quality Gates
- Removed sections: none (template placeholders only)
- Templates: plan-template.md ✅ | spec-template.md ✅ | tasks-template.md ✅ | checklist-template.md ⚠ (generic samples; constitution-aware items generated at runtime)
- Follow-up TODOs:
  - TODO(design-system.md): create design-system.md at repo root before UI implementation
  - design-system.md referenced as absolute source of truth; file not present yet
-->

# Bio Links (Linktree estático) Constitution

## Core Principles

### I. TypeScript Estrito e Componentes Tipados

O projeto MUST usar `strict: true` no `tsconfig` e proibir `any` implícito em todo o código.
Componentes MUST ser funcionais exclusivamente — class components são proibidos.
Toda prop de componente MUST ser declarada em interfaces nomeadas em `src/types.ts`.
Violações MUST ser corrigidas antes de merge; `tsc --noEmit` sem erros é gate obrigatório.

**Rationale**: tipagem estrita elimina classes de bug em runtime e mantém contratos explícitos
entre config, tipos e UI em um projeto pequeno e estático.

### II. UI Pura — Sem Lógica de Negócio nos Componentes

Componentes em `src/components/` MUST limitar-se a renderização, composição e handlers de
apresentação (navegação, foco, aria). Transformação de dados, regras de visibilidade, ordenação
ou defaults de conteúdo MUST residir fora dos componentes (ex.: helpers em módulo dedicado ou
derivação a partir de `src/config.ts` antes do render).

**Rationale**: separar apresentação de regras permite customizar a página editando apenas dados,
sem reabrir implementação de UI.

### III. Customização Config-First

Toda personalização visível ao usuário final (links, textos, imagens, tema, metadados) MUST
estar em `src/config.ts`. Nenhum outro arquivo MUST ser editado para customizar a página publicada.
`src/types.ts` define contratos; `src/config.ts` fornece valores; componentes apenas consomem.

**Rationale**: o produto é uma página de bio estática — o fluxo de uso principal é editar config,
não código React.

### IV. Arquitetura em Camadas e Dependências Mínimas

Estrutura obrigatória: `config` (dados) → `types` (contratos) → `components` (UI).
Dependências de produção MUST limitar-se a React 19, TypeScript, Vite e uma única biblioteca de
ícones. Novas dependências MUST ser justificadas no plano com alternativa nativa rejeitada.

**Rationale**: bundle pequeno, deploy estático simples e manutenção previsível para um site de links.

### V. Mobile-First e Design System

Layout e componentes MUST funcionar corretamente em viewport de 320px de largura (mobile-first).
Cores, tipografia e espaçamento MUST seguir `design-system.md` na raiz do repositório como
referência absoluta — desvios MUST ser documentados e aprovados na revisão de plano.
Breakpoints e tokens MUST ser consumidos via variáveis/CSS alinhados ao design system, não valores
ad hoc em componentes.

**Rationale**: a página é consumida majoritariamente em dispositivos móveis; consistência visual
depende de uma única fonte de tokens.

### VI. Acessibilidade Mínima (WCAG AA)

Todo link interativo MUST ter `aria-label` descritivo (ou texto visível equivalente).
Toda imagem MUST ter `alt` significativo ou `alt=""` quando decorativa.
Contraste de texto e controles MUST atender WCAG 2.1 nível AA.
Foco visível e ordem de tabulação lógica MUST ser preservados em todos os estados.

**Rationale**: página pública de links deve ser utilizável por leitores de tela e baixa visão.

### VII. SEO Local e Estruturado

Metadados (title, description, Open Graph, favicon) MUST ser definidos em `src/config.ts` e
refletidos em `index.html` / head estático gerado no build.
JSON-LD ou microdados MUST descrever `Person` ou `ProfilePage` quando aplicável, embutidos no
HTML de saída — sem backend ou SSR obrigatório.
URLs canônicas e `lang` do documento MUST estar corretos para o idioma do perfil.

**Rationale**: discoverability depende de HTML estático bem formado, não de APIs dinâmicas.

### VIII. Deploy Estático (CDN / GitHub Pages)

O artefato de `vite build` MUST funcionar em qualquer CDN estática sem configuração de servidor
(rewrites, Node, edge functions proibidos como requisito).
GitHub Pages é o alvo principal: `base` do Vite, caminhos de assets e links MUST ser validados
para subpath de repositório quando aplicável.
Nenhuma variável de ambiente de runtime MUST ser necessária após o build.

**Rationale**: hospedagem gratuita e previsível com zero ops.

## Technology Stack

| Camada | Escolha | Restrição |
|--------|---------|-----------|
| UI | React 19 | Apenas function components |
| Linguagem | TypeScript (strict) | Zero `any` implícito |
| Build | Vite | Output estático apenas |
| Ícones | Uma lib de ícones | Sem libs de UI completas (MUI, Chakra, etc.) |
| Estado global | Não obrigatório | Preferir props derivadas de `config.ts` |
| Backend | Proibido no escopo | Sem API, auth ou CMS em v1 |

## Development Workflow & Quality Gates

1. **Antes do plano**: Constitution Check no `plan.md` — todas as gates MUST passar.
2. **Implementação**: editar `src/config.ts` para mudanças de conteúdo; código só quando contrato
   ou UI exigir.
3. **Verificação local**: `npm run build` (ou equivalente) sem warnings bloqueantes; preview em
   320px; validar contraste e aria manualmente ou via checklist.
4. **Deploy**: pipeline ou docs MUST documentar publicação em GitHub Pages a partir de `dist/`.
5. **Complexidade**: violações de princípios MUST aparecer em Complexity Tracking do plano com
   justificativa explícita.

Arquivos de referência obrigatórios: `.specify/memory/constitution.md`, `design-system.md`
(criar antes da fase de UI), `src/config.ts`, `src/types.ts`.

## Governance

Esta constituição supersede convenções ad hoc e templates genéricos do Spec Kit quando em conflito.
Emendas MUST atualizar este arquivo, incrementar versão semver e propagar gates nos templates
`.specify/templates/`.
Revisores MUST verificar compliance com princípios I–VIII em todo PR de código de aplicação.
Versão MAJOR: remoção ou redefinição incompatível de princípio. MINOR: novo princípio ou expansão
material. PATCH: clarificações sem mudança de obrigação.

**Version**: 1.0.0 | **Ratified**: 2026-05-25 | **Last Amended**: 2026-05-25
