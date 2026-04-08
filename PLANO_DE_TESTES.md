# PLANO DE TESTES
## Sistema do Inatel - Automação com Cypress

**Versão:** 1.0  
**Data:** 08 de Abril de 2026  
**Projeto:** S07-Cypress_Project  

---

## 1. ESCOPO

### Sistema Testado
Site do Inatel (https://inatel.br) focado em validar as principais funcionalidades através de automação com Cypress.

### Funcionalidades Cobertas

1. **Acessibilidade** — Recursos de contraste (escuro, claro, cinza), manipulação de tamanho de fonte (aumentar/reduzir), zoom de navegação e gerenciador de cookies
2. **Notícias** — Carregamento de página, validação de imagens, efeitos de hover em diferentes contextos (mobile, stress, dados inválidos)
3. **Navegação** — Fluxos básicos de acesso ao site e navegação entre páginas
4. **Fluxo Negativo** — Tratamento de erros 404, URLs inválidas, caracteres especiais, requisições malformadas

---

## 2. OBJETIVOS

- Validar que o site carrega corretamente em diferentes resoluções e cenários
- Garantir que os controles de acessibilidade funcionam sem quebra visual ou layout
- Confirmar que a página de notícias mantém integridade mesmo em contextos inadequados (hover prematuro, imagens inválidas, stress)
- Verificar o tratamento apropriado de erros e requisições inválidas
- Assegurar compatibilidade e estabilidade do frontend

---

## 3. ESTRATÉGIA DE TESTES

### Abordagem
- **Caixa-Preta**: Validação de entrada/saída sem conhecimento da implementação interna
- **Caixa-Cinza**: Análise de seletores, classes CSS e estado do DOM durante execução

### Técnicas Aplicadas

| Técnica | Aplicação |
|---------|-----------|
| **Particionamento de Equivalência** | Agrupamento de testes por funcionalidade (acessibilidade, notícias, navegação, fluxo negativo) |
| **Análise de Valor Limite** | Testes de tamanho de fonte mínimo/máximo; reloads e transições entre estados |
| **Teste de Stress** | Múltiplos eventos de hover rapidamente (20 repetições) para validar performance |
| **Testes de Dados Inválidos** | Imagens com src inválido, URLs malformadas, caracteres especiais |
| **Testes de Timing** | Execução de ações em momentos inadequados (hover prematuro antes do carregamento) |

---

## 4. AMBIENTE

### Tecnologias e Versões

| Componente | Versão |
|-----------|--------|
| **Cypress** | ^15.13.0 |
| **Node.js** | Recomendado: 16.x ou superior |
| **Browser** | Chromium (padrão do Cypress) |
| **Framework de Testes** | Mocha |
| **Preprocessador BDD** | @badeball/cypress-cucumber-preprocessor@^24.0.1 |
| **Reporter** | cypress-mochawesome-reporter@^4.0.2 |

### Dependências Instaladas
```json
{
  "@badeball/cypress-cucumber-preprocessor": "^24.0.1",
  "@bahmutov/cypress-esbuild-preprocessor": "^2.2.8",
  "cypress": "^15.13.0",
  "cypress-mochawesome-reporter": "^4.0.2",
  "esbuild": "^0.28.0"
}
```

### Resoluções Testadas
- **Desktop**: 1440x900 (padrão)
- **Mobile**: 375x667 (viewport mobile)

### Requisitos do Ambiente
- Conectividade com o servidor do Inatel
- JavaScript habilitado no navegador
- Cookies e storage local habilitados

---

## 5. DESCRIÇÃO DOS CASOS DE TESTE

### Legenda de Colunas
- **ID**: Identificador único do caso de teste
- **Nome**: Descrição breve do que é testado
- **Pré-condição**: Estado necessário antes da execução
- **Dados de Entrada**: Valores/ações utilizados
- **Ação**: Passos executados
- **Resultado Esperado**: Comportamento esperado

### 5.1 - TESTES DE ACESSIBILIDADE (TC-001 a TC-008)

| ID | Nome | Pré-condição | Dados de Entrada | Ação | Resultado Esperado |
|---|---|---|---|---|---|
| **TC-001** | Abrir gerenciador de acessibilidade com controles principais | Página home carregada, viewport 1440x900 | Clique no botão de acessibilidade | Abrir painel de controles | Todos os controles visíveis: contraste, fonte, zoom; sem quebra visual |
| **TC-002** | Aplicar contraste escuro no HTML | Gerenciador aberto | Clique em "Contraste Escuro" | Aplicar classe CSS 'dxaccess' | Classe 'dxaccess' presente no <html>; página sem erros |
| **TC-003** | Aplicar contraste claro e cinza de forma independente | Gerenciador aberto | Clique em "Contraste Claro" depois "Contraste Cinza" | Alternar entre contrastes | Classes aplicadas/removidas corretamente; apenas um contraste ativo por vez |
| **TC-004** | Aumentar tamanho de fonte | Gerenciador aberto | Clique em "Aumentar Fonte" | Disparar aumento | Font-size root > antes; nível de zoom incrementado; layout mantém integridade |
| **TC-005** | Reduzir tamanho de fonte após aumento | Fonte aumentada | Clique em "Reduzir Fonte" | Disparar redução | Font-size reduzido; nível >= 0; layout estável |
| **TC-006** | Combinar aumento de fonte com contraste escuro | Gerenciador aberto | Clique em "Aumentar Fonte" + "Contraste Escuro" | Aplicar ambos | Fonte aumentada E classe 'dxaccess' ativa; sem conflitos visuais |
| **TC-007** | Ativar zoom e exibir tooltip ao passar mouse | Viewport >= 1280px | Clique em "Zoom" | Ativar zoom ao passar mouse | Opção recebe estado ativo; tooltip exibido; sem quebra layout |
| **TC-008** | Abrir gerenciador de cookies pelo modal de acessibilidade | Gerenciador aberto | Clique em opção de cookies | Abrir gerenciador de cookies | Painel de cookies aberto; funcionalidade integrada sem erros |

### 5.2 - TESTES DE HOME (TC-009 a TC-013)

| ID | Nome | Pré-condição | Dados de Entrada | Ação | Resultado Esperado |
|---|---|---|---|---|---|
| **TC-009** | Tentar acessar página inexistente (404) | Browser em home | URL: `/home/pagina-inexistente` | Visitar URL inválida | Status HTTP 404; mensagem de erro não quebra layout |
| **TC-010** | Validar que elemento crítico não desaparece após reload | Página carregada | Reload da página | Contar links home antes e depois | Quantidade de links mantém-se > 0; estrutura preservada |
| **TC-011** | Validar interação com links e navegação | Página carregada | Clique no primeiro link | Navegar e validar URL | URL muda de `/home/`; body existe; sem exceções |
| **TC-012** | Página com requisição inválida não quebra | Browser em home | Requisição com método inválido | cy.request() falso | Status é número > 0; página continua respondendo após requisição |
| **TC-013** | Comportamento ao acessar URL com caracteres especiais | Browser em home | URL: `/home/página@#$%` | Requisição direta | Status >= 300 (redirecionamento ou erro); sem crash do navegador |

### 5.3 - TESTES DE NOTÍCIAS (TC-014 a TC-020)

| ID | Nome | Pré-condição | Dados de Entrada | Ação | Resultado Esperado |
|---|---|---|---|---|---|
| **TC-014** | Hover em viewport mobile não quebra layout | Página notícias carregada, viewport 375x667 | Trigger mouseenter/mouseleave em link imagem | Disparar hover em mobile | Layout permanece estável; scrollWidth <= offsetWidth + 5px; sem erro |
| **TC-015** | Hover em imagem com src inválido | Página notícias carregada | Modificar src para URL 404, disparar hover | Hover em imagem corrompida | Elemento <img> continua no DOM; item visível; layout íntegro |
| **TC-016** | Hover disparado antes do carregamento completo | Página em fase de carregamento | cy.visit() + hover com timeout 0 | Tentar hover prematuro | Após timeout, imagens carregam; sem exceção irrecuperável; > 0 imagens visíveis |
| **TC-017** | Hover em container sem imagem filha | Página notícias carregada | Verificar covers sem <img>, disparar hover se existirem | Hover em cover sem imagem | Se existir: layout estável; se não: log informativo + validação de integridade |
| **TC-018** | Hover repetido em alta frequência (stress) | Página notícias carregada | 20 ciclos de mouseenter/mouseleave | Disparar hover stress | Imagem continua visível; scrollWidth > 0; scrollHeight > 0; sem travamento |
| **TC-019** | Validar links de notícias visíveis | Página notícias carregada | Buscar `.news-main .news-cover a` | Validar visibilidade de links | Links encontrados > 0; todos visíveis |
| **TC-020** | Validar conteúdo de notícias carregado corretamente | Página notícias carregada | Buscar `.news-main` | Validar itens visíveis | Itens encontrados > 0; conteúdo principal carregado |

### 5.4 - TESTES DE PERFORMANCE (TC-021 a TC-023)

| ID | Nome | Pré-condição | Dados de Entrada | Ação | Resultado Esperado |
|---|---|---|---|---|---|
| **TC-021** | Validar tempo de carregamento da página | Cypress configurado | Navegação para página | cy.visit() e medição de tempo | Página carrega em tempo aceitável (< 5 segundos) |
| **TC-022** | Validar dados em cache não causam lentidão | Primeira carga realizada | Segunda carga da página | Carregar página novamente | Cache funciona; segunda carga mais rápida sem impacto visual |
| **TC-023** | Validar limite de requisições e rate limiting | Servidor respondendo | Múltiplas requisições rápidas | Disparar requisições em sequência | Servidor respeita rate limits; sem travamento ou erro 429 não esperado |

---

## 6. CRITÉRIOS DE ACEITE

### Percentual Mínimo de Aprovação
- **Taxa de Sucesso**: Mínimo **95%** dos testes deve passar

 

### Critérios de Rejeição
❌ Taxa de aprovação < 95%  
---

## 7. RISCOS E LIMITAÇÕES

### Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Flakiness de tempo** | Média | Alto | Aumentar timeouts; aguardar elementos explicitamente |
| **Dependência de conectividade** | Média | Alto | Validar conectividade antes; usar mocks se necessário |
| **Variações de browser** | Baixa | Médio | Testar apenas em Chromium; documentar limites |
| **Mudanças no site** | Média | Alto | Manter seletores atualizados; revisão regular |
| **Cookies/Storage** | Baixa | Baixo | Limpar antes de cada suite via beforeEach |
| **Imagens quebradas** | Baixa | Médio | TC-015 cobre cenário; monitorar CDN |

### Limitações

🔸 **Testes limitados a Chromium** — Não cobre IE, Safari ou Firefox  
🔸 **Teste de performance limitado** — Validação básica de tempo; sem métricas detalhadas de LCP, FID, CLS  
🔸 **Sem teste de acessibilidade automática** — Não usa ferramentas como axe.js  
🔸 **Sem teste de SSR/hidratação** — Assume aplicação client-side  
🔸 **Cobertura visual limitada** — Não usa visual regression testing  
🔸 **Dados do servidor não mockados** — Depende de servidor real estar disponível  
🔸 **Timeout fixo de 15s** — Pode falhar em conexões lentas  
 
---

**Responsáveis**: Fabio Augusto Gandra Cruvine, Karolina Oliveira da Silva, Yam Sol Britto Bertamini  

