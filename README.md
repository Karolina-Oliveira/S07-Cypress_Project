# Inatel Cypress Project

Projeto de automacao de testes end-to-end do site do Inatel utilizando Cypress, com cenarios em dois formatos:

- `sem-bdd`: testes tradicionais em arquivos `.spec.js`
- `bdd`: testes escritos com Gherkin (`.feature`) e step definitions

O projeto esta configurado para executar os testes contra a URL base `https://inatel.br`.

## Tecnologias utilizadas

- Node.js
- npm
- Cypress
- Cucumber Preprocessor para Cypress
- Esbuild Preprocessor

## Pre-requisitos

Antes de executar o projeto, tenha instalado na maquina:

- Node.js 18 ou superior
- npm

Para conferir as versoes instaladas:

```bash
node -v
npm -v
```

## Como replicar o projeto

1. Clone o repositorio:

```bash
git clone https://github.com/Karolina-Oliveira/S07-Cypress_Project.git
```

2. Acesse a pasta do projeto:

```bash
cd inatel_cypress_project
```

3. Instale as dependencias:

```bash
npm install
```

Se quiser instalar exatamente as versoes do `package-lock.json`, voce tambem pode usar:

```bash
npm ci
```

## Estrutura principal

```text
cypress/
  bdd/
    features/
    step_definitions/
  sem-bdd/
    specs/
  pages/
  support/
cypress.config.js
cypress.bdd.config.js
package.json
```

## Configuracao dos testes

- Configuracao padrao (`sem-bdd`): `cypress.config.js`
- Configuracao BDD (`bdd`): `cypress.bdd.config.js`
- URL base utilizada nos testes: `https://inatel.br`

## Comandos de execucao

### Abrir o Cypress em modo interativo

Abre o Cypress usando a configuracao padrao do projeto:

```bash
npm run cypress:abrir
```

Abrir somente os testes `sem-bdd`:

```bash
npm run abrir:sem-bdd
```

Abrir os testes `bdd`:

```bash
npm run abrir:bdd
```

### Executar os testes em modo headless

Executa todos os testes da configuracao padrao:

```bash
npm test
```

Executa apenas os testes `sem-bdd`:

```bash
npm run test:sem-bdd
```

Executa apenas os testes `bdd`:

```bash
npm run test:bdd
```

## Tipos de teste no projeto

### Sem BDD

Os testes ficam em:

```text
cypress/sem-bdd/specs/
```

Exemplos atuais:

- navegacao no site
- verificacao de acessibilidade

### BDD

Os cenarios ficam em:

```text
cypress/bdd/features/
```

As implementacoes dos passos ficam em:

```text
cypress/bdd/step_definitions/
```

Esse formato utiliza Gherkin com palavras-chave como `Dado`, `Quando` e `Entao`.

## Dependencias principais

As dependencias de desenvolvimento configuradas no projeto sao:

- `cypress`
- `@badeball/cypress-cucumber-preprocessor`
- `@bahmutov/cypress-esbuild-preprocessor`
- `esbuild`

## Observacoes

- O projeto depende de acesso a internet para abrir e validar paginas do site `https://inatel.br`.
- Em caso de falha de ambiente, execute novamente a instalacao com `npm install`.
- Os testes sao executados sobre o site real do Inatel, entao mudancas no site podem impactar os cenarios.

## Autores

- Fabio Augusto Gandra Cruvine
- Karolina Oliveira da Silva
- Yam Sol Britto Bertamini
