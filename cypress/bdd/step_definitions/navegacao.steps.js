import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que o usuario acessa a home do Inatel', () => {
  cy.visit('/home/')
})

Then('a pagina inicial deve ser exibida com sucesso', () => {
  cy.url().should('include', '/home')
  cy.contains('Inatel').should('be.visible')
})
