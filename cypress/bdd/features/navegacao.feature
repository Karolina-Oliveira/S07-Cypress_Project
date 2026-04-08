Feature: Navegacao basica no site do Inatel

  Scenario: TC-001 - Acessar a home do site
    Given que o usuario acessa a home do Inatel
    Then a pagina inicial deve ser exibida com sucesso

  Scenario: TC-010 - Acessar a pagina de noticias e validar conteudo carregado
    Given que o usuario acessa a pagina de noticias em viewport desktop
    Then a pagina de noticias deve exibir links e conteudo visiveis

