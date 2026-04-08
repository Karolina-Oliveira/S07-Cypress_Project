describe('Navegação - Site do Inatel', () => {
  it('TC-001 - deve acessar a home com sucesso', () => {
    cy.visit('/home/')
    cy.url().should('include', '/home')
    cy.contains('Inatel').should('be.visible')
  })
})