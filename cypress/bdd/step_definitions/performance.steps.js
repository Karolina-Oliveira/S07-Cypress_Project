import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor'

Given('que o usuario acessa a home do Inatel para teste de performance', () => {
  cy.viewport(1440, 900)
  cy.visit('/home/')
})

Then('a pagina deve estar totalmente carregada e visivel', () => {
  cy.contains('Inatel', { timeout: 5000 }).should('be.visible')
  cy.get('body').should('be.visible')
  cy.url().should('include', '/home')
})

Given('que o usuario carrega a pagina pela primeira vez', () => {
  cy.viewport(1440, 900)
  cy.visit('/home/')
})

And('que o usuario mede o tempo de carregamento inicial', () => {
  cy.contains('Inatel', { timeout: 5000 }).should('be.visible')
  cy.get('body').should('be.visible')
  
  cy.window().then((win) => {
    const tempoSemCache = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart
    cy.wrap(tempoSemCache).as('tempoSemCache')
    cy.log(`Tempo de carregamento SEM cache: ${tempoSemCache}ms`)
  })
})

When('o usuario recarrega a pagina com cache', () => {
  cy.reload()
})

And('que o usuario mede o tempo de carregamento com cache', () => {
  cy.window().then((win) => {
    const tempoComCache = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart
    cy.wrap(tempoComCache).as('tempoComCache')
    cy.log(`Tempo de carregamento COM cache: ${tempoComCache}ms`)
  })
})

Then('o cache nao deve causar lentidao significativa', () => {
  cy.get('@tempoSemCache').then((tempoSemCache) => {
    cy.get('@tempoComCache').then((tempoComCache) => {
      const tolerancia = tempoSemCache * 0.2 // 20% de tolerância
      const tempoMaximoAceitavel = tempoSemCache + tolerancia
      
      cy.log(`Diferença de tempo: ${tempoComCache - tempoSemCache}ms`)
      cy.log(`Tempo máximo aceitável: ${tempoMaximoAceitavel}ms`)
      
      expect(tempoComCache).to.be.lessThan(tempoMaximoAceitavel)
    })
  })
})

And('a pagina deve continuar respondendo normalmente', () => {
  cy.contains('Inatel').should('be.visible')
  cy.get('body').should('be.visible')
})

Given('que o usuario faz multiplas requisicoes rapidas', () => {
  // Setup - não faz nada ainda, só prepara
})

When('o usuario envia a primeira requisicao', () => {
  cy.request({ 
    url: '/home/',
    failOnStatusCode: false 
  }).then((response) => {
    cy.wrap(response.status).as('statusCode1')
  })
})

And('o usuario envia a segunda requisicao', () => {
  cy.request({ 
    url: '/home/',
    failOnStatusCode: false 
  }).then((response) => {
    cy.wrap(response.status).as('statusCode2')
  })
})

And('o usuario envia a terceira requisicao', () => {
  cy.request({ 
    url: '/home/',
    failOnStatusCode: false 
  }).then((response) => {
    cy.wrap(response.status).as('statusCode3')
  })
})

Then('todas as requisicoes devem retornar status 200', () => {
  cy.get('@statusCode1').then((status1) => {
    cy.get('@statusCode2').then((status2) => {
      cy.get('@statusCode3').then((status3) => {
        expect(status1).to.equal(200)
        expect(status2).to.equal(200)
        expect(status3).to.equal(200)
      })
    })
  })
})
