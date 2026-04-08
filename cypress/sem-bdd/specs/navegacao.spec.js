import noticiasPage from '../../pages/NoticiasPage'

describe('Navegação - Site do Inatel', () => {
  it('TC-001 - deve acessar a home com sucesso', () => {
    cy.visit('/home/')
    cy.url().should('include', '/home')
    cy.contains('Inatel').should('be.visible')
  })

  it('TC-010 - deve acessar a pagina de noticias e validar conteudo carregado', () => {
    cy.viewport(1440, 900)
    noticiasPage.acessarNoticias()
    noticiasPage.fecharCookiesSeAparecer()
    noticiasPage.validarPaginaCarregada()
    noticiasPage.validarLinksNoticiasVisiveis()
    noticiasPage.validarConteudoNoticiasCarregado()
  })
})
