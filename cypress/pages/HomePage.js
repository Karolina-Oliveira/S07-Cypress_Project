class HomePage {
  acessar() {
    cy.visit('/home/')
  }

  validarHomeCarregada() {
    cy.url().should('include', '/home')
  }

  abrirMenuAcessibilidade() {
    cy.contains('Acessibilidade').click({ force: true })
  }
}

export default new HomePage()