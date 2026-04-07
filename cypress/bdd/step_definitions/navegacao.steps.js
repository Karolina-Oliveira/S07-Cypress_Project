import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que o usuário acessa a home do Inatel', () => {
  cy.visit('/home/')
})

Then('a página inicial deve ser exibida com sucesso', () => {
  cy.url().should('include', '/home')
  cy.contains('Inatel').should('be.visible')
})