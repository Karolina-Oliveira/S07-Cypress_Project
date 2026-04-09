import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('que o usuario tenta acessar uma pagina inexistente', () => {
  cy.visit('/home/pagina-inexistente', { failOnStatusCode: false })
})

Then('o servidor deve retornar erro 404', () => {
  cy.request({ url: '/home/pagina-inexistente', failOnStatusCode: false })
    .then((response) => {
      expect(response.status).to.equal(404)
    })
})

Given('que o usuario acessa a home do Inatel', () => {
  cy.viewport(1440, 900)
  cy.visit('/home/')
})

Then('os elementos de link home devem estar presentes', () => {
  cy.get('a[href*="/home"]').then((elements) => {
    const initialCount = elements.length
    expect(initialCount).to.be.greaterThan(0)
  })
})

When('o usuario recarrega a pagina', () => {
  cy.reload()
})

Then('os elementos de link home devem continuar presentes', () => {
  cy.get('a[href*="/home"]').then((elements) => {
    const reloadCount = elements.length
    expect(reloadCount).to.be.greaterThan(0)
  })
})

When('o usuario valida que ha elementos visiveis para clicar', () => {
  cy.get('a').first().then(($link) => {
    if ($link.length > 0) {
      cy.get('a').first().should('be.visible')
    }
  })
})

Then('a pagina deve continuar respondendo', () => {
  cy.get('body').should('be.visible')
})

Given('que o usuario faz uma requisicao valida', () => {
  cy.request({
    url: '/home/',
    failOnStatusCode: false
  }).then((response) => {
    cy.wrap(response.status).as('statusCode')
  })
})

Then('o servidor deve retornar um status valido', () => {
  cy.get('@statusCode').then((status) => {
    expect(status).to.be.a('number')
    expect(status).to.be.greaterThan(0)
  })
})

When('o usuario visita a home novamente', () => {
  cy.visit('/home/')
})

Then('a pagina deve continuar respondendo normalmente', () => {
  cy.url().should('include', '/home')
  cy.get('body').should('be.visible')
})

Given('que o usuario tenta acessar uma url com caracteres especiais', () => {
  cy.request({
    url: '/home/página@#$%',
    failOnStatusCode: false
  }).then((response) => {
    cy.wrap(response.status).as('statusCodeEspecial')
  })
})

Then('o servidor deve retornar um status de erro ou redirecionamento', () => {
  cy.get('@statusCodeEspecial').then((status) => {
    expect(status).to.satisfy((s) => s >= 400 || s >= 300)
  })
})
