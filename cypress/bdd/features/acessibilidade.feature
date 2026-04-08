Feature: Acessibilidade no site do Inatel

  Background:
    Given que o usuario acessa a home do Inatel com viewport desktop
    And fecha o banner de cookies se aparecer

  Scenario: TC-002 - Abrir o gerenciador de acessibilidade com os controles principais
    When o usuario abre o gerenciador de acessibilidade
    Then os controles principais de acessibilidade devem ser exibidos

  Scenario: TC-003 - Aplicar contraste escuro no html
    When o usuario ativa o contraste escuro
    Then a pagina deve aplicar o contraste escuro

  Scenario: TC-004 - Aplicar contraste claro e contraste cinza de forma independente
    When o usuario ativa o contraste claro
    Then a pagina deve aplicar o contraste claro
    When o usuario desativa o contraste claro
    And o usuario ativa o contraste cinza
    Then a pagina deve aplicar o contraste cinza

  Scenario: TC-005 - Aumentar o tamanho base da fonte
    Given que o usuario captura o tamanho atual da fonte
    When o usuario aumenta o tamanho da fonte
    Then o tamanho da fonte deve aumentar

  Scenario: TC-006 - Reduzir o tamanho base da fonte apos um aumento
    When o usuario aumenta o tamanho da fonte
    And captura a fonte apos o aumento
    And reduz o tamanho da fonte
    Then o tamanho da fonte deve diminuir

  Scenario: TC-007 - Combinar aumento de fonte com contraste escuro
    Given que o usuario captura o tamanho atual da fonte
    When o usuario aumenta o tamanho da fonte
    And ativa o contraste escuro
    Then o tamanho da fonte deve aumentar
    And a pagina deve aplicar o contraste escuro

  Scenario: TC-008 - Ativar zoom ao passar o mouse e exibir tooltip
    When o usuario ativa o zoom por hover se estiver disponivel
    Then o comportamento de zoom por hover deve ser validado

  Scenario: TC-009 - Abrir o gerenciador de cookies a partir do modal de acessibilidade
    When o usuario abre o gerenciador de cookies pelo modal de acessibilidade
    Then o gerenciador de cookies deve ser exibido
