Feature: Performance - Site do Inatel

  Scenario: TC-021 - Validar tempo de carregamento da página
    Given que o usuario acessa a home do Inatel para teste de performance
    Then a pagina deve estar totalmente carregada e visivel

  Scenario: TC-022 - Validar dados em cache não causam lentidão
    Given que o usuario carrega a pagina pela primeira vez
    And que o usuario mede o tempo de carregamento inicial
    When o usuario recarrega a pagina com cache
    And que o usuario mede o tempo de carregamento com cache
    Then o cache nao deve causar lentidao significativa
    And a pagina deve continuar respondendo normalmente

  Scenario: TC-023 - Validar limite de requisições e rate limiting
    Given que o usuario faz multiplas requisicoes rapidas
    When o usuario envia a primeira requisicao
    And o usuario envia a segunda requisicao
    And o usuario envia a terceira requisicao
    Then todas as requisicoes devem retornar status 200
