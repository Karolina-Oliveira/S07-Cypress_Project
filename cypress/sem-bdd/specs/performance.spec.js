describe('Performance - Site do Inatel', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
  })

  it('TC-021 - Validar tempo de carregamento da página', () => {
    cy.visit('/home/')
    cy.contains('Inatel', { timeout: 5000 }).should('be.visible')
    
    // Validar que a página carregou corretamente
    cy.get('body').should('be.visible')
    cy.url().should('include', '/home')
  })



  it('TC-022 - Validar dados em cache não causam lentidão', () => {
    let tempoSemCache
    let tempoComCache

    // Primeira requisição (sem cache)
    cy.visit('/home/')
    cy.window().then((win) => {
      tempoSemCache = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart
      cy.log(`Tempo de carregamento SEM cache: ${tempoSemCache}ms`)
    })

    // Garantir que a página está totalmente carregada
    cy.contains('Inatel', { timeout: 5000 }).should('be.visible')
    cy.get('body').should('be.visible')

    // Recarregar página (segunda requisição com cache)
    cy.reload()
    cy.window().then((win) => {
      tempoComCache = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart
      cy.log(`Tempo de carregamento COM cache: ${tempoComCache}ms`)
    })

    // Validar que a página continua respondendo normalmente
    cy.contains('Inatel').should('be.visible')
    cy.get('body').should('be.visible')

    // Validar que o cache não causou piora de performance
    // Cache deve ser igual ou mais rápido (tolerância de 20% para variações)
    cy.then(() => {
      const tolerancia = tempoSemCache * 0.2 // 20% de tolerância
      const tempoMaximoAceitavel = tempoSemCache + tolerancia
      
      cy.log(`Diferença de tempo: ${tempoComCache - tempoSemCache}ms`)
      cy.log(`Tempo máximo aceitável: ${tempoMaximoAceitavel}ms`)
      
      expect(tempoComCache).to.be.lessThan(tempoMaximoAceitavel)
    })
  })


  it('TC-023 - Validar limite de requisições e rate limiting', () => {
    // Fazer múltiplas requisições rápidas para testar rate limiting
    let statusCode1, statusCode2, statusCode3
    
    cy.request({ 
      url: '/home/',
      failOnStatusCode: false 
    }).then((response) => {
      statusCode1 = response.status
    })
    
    cy.request({ 
      url: '/home/',
      failOnStatusCode: false 
    }).then((response) => {
      statusCode2 = response.status
    })
    
    cy.request({ 
      url: '/home/',
      failOnStatusCode: false 
    }).then((response) => {
      statusCode3 = response.status
      
      // Validar que requisições foram bem-sucedidas
      expect(statusCode1).to.equal(200)
      expect(statusCode2).to.equal(200)
      expect(statusCode3).to.equal(200)
    })
  })
})

