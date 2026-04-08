import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'
import noticiasPage from '../../pages/NoticiasPage'

Given('que o usuario acessa a home do Inatel', () => {
  cy.visit('/home/')
})

Then('a pagina inicial deve ser exibida com sucesso', () => {
  cy.url().should('include', '/home')
  cy.contains('Inatel').should('be.visible')
})

// TC-010
Given('que o usuario acessa a pagina de noticias em viewport desktop', () => {
  cy.viewport(1440, 900)
  noticiasPage.acessarNoticias()
  noticiasPage.fecharCookiesSeAparecer()
})

Then('a pagina de noticias deve exibir links e conteudo visiveis', () => {
  noticiasPage.validarPaginaCarregada()
  noticiasPage.validarLinksNoticiasVisiveis()
  noticiasPage.validarConteudoNoticiasCarregado()
})
