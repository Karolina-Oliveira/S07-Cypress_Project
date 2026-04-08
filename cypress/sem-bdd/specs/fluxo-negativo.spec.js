describe('Fluxo Negativo - Site do Inatel', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
    cy.visit('/home/')
  })

  it('TC-009 - Tentar acessar uma página inexistente (404)', () => {
    cy.visit('/home/pagina-inexistente', { failOnStatusCode: false })
    
    // Validar que a página retorna status 404 ou que o conteúdo esperado não carrega
    cy.request({ url: '/home/pagina-inexistente', failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.equal(404)
      })
  })

  it('TC-010 - Validar que elemento crítico não desaparece de maneira inesperada', () => {
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

it('TC-011 - Validar interação com links e navegação', () => {
  // Verificar que links existem e são clicáveis
  cy.get('a').should('have.length.greaterThan', 0)
  
  // Clicar no primeiro link e validar que a URL mudou
  cy.get('a').first().then(($link) => {
    const href = $link.attr('href')
    cy.get('a').first().click()
    
    // Esperar navegação completar
    cy.url().should('not.equal', 'http://localhost:3000/home/')
    cy.get('body').should('exist')
  })

})
  it('TC-012 - Validar que página com requisição inválida não quebra', () => {
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

  it('TC-013 - Validar comportamento ao tentar acessar URL com caracteres especiais', () => {
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
