describe('Navegação - Site do Inatel', () => {
  it('deve acessar a home com sucesso', () => {
    cy.visit('/home/')
    cy.url().should('include', '/home')
    cy.contains('Inatel').should('be.visible')
  })
})