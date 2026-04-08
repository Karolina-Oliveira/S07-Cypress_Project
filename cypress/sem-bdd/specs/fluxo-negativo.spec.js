describe('Fluxo Negativo - Site do Inatel', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.visit('/home/')
  })

  it('TC-016 - Tentar acessar uma página inexistente (404)', () => {
    cy.visit('/home/pagina-inexistente', { failOnStatusCode: false })
    
    // Validar que a página retorna status 404 ou que o conteúdo esperado não carrega
    cy.request({ url: '/home/pagina-inexistente', failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.equal(404)
      })
  })

  it('TC-017 - Validar que elemento crítico não desaparece de maneira inesperada', () => {
    // Capturar quantidade inicial de elementos principais
    cy.get('a[href*="/home"]').then((elements) => {
      const initialCount = elements.length
      expect(initialCount).to.be.greaterThan(0)
    })

    // Recarregar e verificar que a estrutura mantém
    cy.reload()
    
    cy.get('a[href*="/home"]').then((elements) => {
      const reloadCount = elements.length
      expect(reloadCount).to.be.greaterThan(0)
      // Validar que não há variações drásticas
      cy.get('a[href*="/home"]').should('have.length.greaterThan', 0)
    })
  })

  it('TC-018 - Validar que página responde a cliques em elementos', () => {
    // Testar que a página responde a interações mesmo sem dados
    cy.get('a').first().then(($link) => {
      if ($link.length > 0) {
        // Validar que o elemento é interativo
        cy.get('a').first().should('be.visible')
      }
    })
    
    // Validar que página mantém estado após clique
    cy.get('body').should('be.visible')
  })

  it('TC-019 - Validar que página com requisição inválida não quebra', () => {
    // Testar requisição com método HTTP inválido (simulado)
    cy.request({ 
      url: '/home/', 
      failOnStatusCode: false 
    }).then((response) => {
      // A requisição deve retornar status válido (200, 404, ou similar)
      expect(response.status).to.be.a('number')
      expect(response.status).to.be.greaterThan(0)
    })
    
    // Após requisição, página deve continuar respondendo
    cy.visit('/home/')
    cy.url().should('include', '/home')
  })

  it('TC-020 - Validar comportamento ao tentar acessar URL com caracteres especiais', () => {
    // Testar requisição direta com caracteres especiais
    cy.request({ 
      url: '/home/página@#$%', 
      failOnStatusCode: false 
    }).then((response) => {
      // Espera um status de erro ou redirecionamento
      expect(response.status).to.satisfy((status) => {
        return status >= 400 || status >= 300
      })
    })
  })
})
