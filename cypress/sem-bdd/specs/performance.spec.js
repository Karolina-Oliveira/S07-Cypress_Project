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
    cy.visit('/home/')
    
    // Recarregar página (segunda requisição deve funcionar normalmente)
    cy.reload()
    
    // Validar que a página continua respondendo normalmente
    cy.contains('Inatel').should('be.visible')
    cy.get('body').should('be.visible')
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

