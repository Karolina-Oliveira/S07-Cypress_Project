class ContatoPage {
  acessar() {
    cy.visit('/home/contato')
  }

  preencherNome(nome) {
    cy.get('input, textarea').contains ? null : null
  }
}

export default new ContatoPage()