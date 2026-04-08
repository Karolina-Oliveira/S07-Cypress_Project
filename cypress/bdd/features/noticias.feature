Feature: Efeito hover em imagens de noticias - Dados Invalidos e Inoportunos

  # Categoria: Dados Inválidos / Inoportunos
  # Cenários com contexto inadequado, dados ausentes/malformados ou
  # ações em momentos incorretos do fluxo.

  Background:
    Given que o usuario acessa a pagina de noticias com viewport desktop
    And fecha o banner de cookies na pagina de noticias

  Scenario: TC-011 - Hover em viewport mobile nao deve quebrar o layout
    # Contexto invalido: dispositivo touch nao suporta efeito CSS :hover
    When o usuario redimensiona para viewport mobile
    Then o hover na imagem nao deve causar quebra de layout

  Scenario: TC-012 - Hover em imagem com src invalido nao deve gerar erro
    # Dado malformado: URL de imagem corrompida/inexistente
    When o usuario tenta hover em uma imagem com src invalido
    Then a pagina nao deve quebrar e a imagem deve permanecer no DOM

  Scenario: TC-013 - Hover disparado antes do carregamento completo nao deve causar falha
    # Momento inadequado: hover antes do DOM estar pronto
    When o usuario tenta hover prematuramente apos a navegacao
    Then a pagina deve carregar normalmente mesmo apos o hover prematuro

  Scenario: TC-014 - Hover em container sem imagem filha nao deve gerar excecao
    # Dado ausente: container de noticia sem thumbnail
    When o usuario tenta hover em container de noticia sem imagem
    Then a pagina nao deve quebrar e deve validar integridade dos containers

  Scenario: TC-015 - Hover repetido em alta frequencia nao deve travar o layout
    # Dado inoportunos: acoes em excesso no mesmo elemento
    When o usuario simula hover repetido em alta frequencia
    Then a pagina deve permanecer estavel apos o stress de hover
