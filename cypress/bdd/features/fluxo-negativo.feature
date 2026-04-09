Feature: Fluxo Negativo - Tratamento de Erros

  Scenario: TC-016 - Tentar acessar uma página inexistente (404)
    Given que o usuario tenta acessar uma pagina inexistente
    Then o servidor deve retornar erro 404

  Scenario: TC-017 - Validar que elemento crítico não desaparece de maneira inesperada
    Given que o usuario acessa a home do Inatel
    Then os elementos de link home devem estar presentes
    When o usuario recarrega a pagina
    Then os elementos de link home devem continuar presentes

  Scenario: TC-018 - Validar que página responde a cliques em elementos
    Given que o usuario acessa a home do Inatel
    When o usuario valida que ha elementos visiveis para clicar
    Then a pagina deve continuar respondendo

  Scenario: TC-019 - Validar que página com requisição inválida não quebra
    Given que o usuario faz uma requisicao valida
    Then o servidor deve retornar um status valido
    When o usuario visita a home novamente
    Then a pagina deve continuar respondendo normalmente

  Scenario: TC-020 - Validar comportamento ao tentar acessar URL com caracteres especiais
    Given que o usuario tenta acessar uma url com caracteres especiais
    Then o servidor deve retornar um status de erro ou redirecionamento
