import noticiasPage from '../../pages/NoticiasPage'

/**
 * Suite: Dados Inválidos / Inoportunos
 * Cenários com contexto inadequado, dados ausentes/malformados ou
 * ações em momentos incorretos do fluxo — focados no efeito hover
 * de zoom e rotação das imagens de notícias.
 */
describe('Noticias - Dados Invalidos e Inoportunos - Site do Inatel', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
    noticiasPage.acessarNoticias()
    noticiasPage.fecharCookiesSeAparecer()
  })

  it('TC-011 - hover em viewport mobile nao deve quebrar o layout (contexto invalido para hover CSS)', () => {
    // Redimensiona para mobile: efeito CSS :hover não se aplica em touch
    cy.viewport(375, 667)
    noticiasPage.validarPaginaCarregada()
    noticiasPage.validarEstabilidadeHoverMobile()
    noticiasPage.validarSemQuebraVisual()
  })

  it('TC-012 - hover em imagem com src invalido nao deve gerar erro nem quebrar o layout', () => {
    noticiasPage.validarPaginaCarregada()
    noticiasPage.simularHoverEmImagemComSrcInvalido()
    noticiasPage.validarSemQuebraVisual()
  })

  it('TC-013 - hover disparado antes do carregamento completo nao deve causar falha irrecuperavel', () => {
    // Reacessa a página e tenta hover imediatamente (momento inadequado)
    cy.visit('/noticias/')
    noticiasPage.tentarHoverPrematuro()
    noticiasPage.validarSemQuebraVisual()
  })

  it('TC-014 - hover em container sem imagem filha nao deve gerar excecao (dado ausente)', () => {
    noticiasPage.validarPaginaCarregada()
    noticiasPage.validarHoverEmCoverSemImagem()
    noticiasPage.validarSemQuebraVisual()
  })

  it('TC-015 - hover repetido em alta frequencia nao deve travar ou quebrar o layout (stress)', () => {
    noticiasPage.validarPaginaCarregada()
    noticiasPage.simularHoverStress(20)
    noticiasPage.validarSemQuebraVisual()
  })

  it('TC-021 - validar links de noticias visiveis na pagina', () => {
    noticiasPage.validarPaginaCarregada()
    noticiasPage.validarLinksNoticiasVisiveis()
  })

  it('TC-022 - validar conteudo de noticias carregado corretamente', () => {
    noticiasPage.validarPaginaCarregada()
    noticiasPage.validarConteudoNoticiasCarregado()
  })
})
