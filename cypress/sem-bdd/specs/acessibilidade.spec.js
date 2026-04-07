describe('Acessibilidade - Site do Inatel', () => {
  it('deve abrir o gerenciador de acessibilidade', () => {
    cy.visit('/home/')
    cy.contains('Acessibilidade').should('be.visible')
  })
})