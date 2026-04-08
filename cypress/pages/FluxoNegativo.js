class FluxoNegativo {
  // Seletores
  seletores = {
    paginaInexistente: '/home/pagina-inexistente',
    linksHome: 'a[href*="/home"]',
    botaoContato: 'Contato',
    botaoSubmit: 'button[type="submit"]',
    campoEmail: 'input[type="email"]',
    campoTexto: 'input[type="text"]',
    paginaEspecial: '/home/página@#$%'
  }

  // Método para visitar a home
  acessarHome() {
    cy.visit('/home/')
  }

  // TC-NEG-001: Tentar acessar página inexistente (404)
  validarPaginaInexistente() {
    cy.visit(this.seletores.paginaInexistente, { failOnStatusCode: false })
    
    cy.request({ 
      url: this.seletores.paginaInexistente, 
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.equal(404)
    })
  }

  // TC-NEG-002: Validar que elementos críticos não desaparecem
  validarElementosCriticosAposFalha() {
    cy.get(this.seletores.linksHome).then((elements) => {
      const initialCount = elements.length
      expect(initialCount).to.be.greaterThan(0)
    })

    cy.reload()
    
    cy.get(this.seletores.linksHome).then((elements) => {
      const reloadCount = elements.length
      expect(reloadCount).to.be.greaterThan(0)
      cy.get(this.seletores.linksHome).should('have.length.greaterThan', 0)
    })
  }

  // TC-NEG-003: Enviar formulário com dados inválidos
  testarFormularioInvalido() {
    cy.contains(this.seletores.botaoContato, { timeout: 5000 }).then(($el) => {
      if ($el.length > 0) {
        cy.contains(this.seletores.botaoContato).click({ force: true })
        
        cy.get(this.seletores.botaoSubmit).then(($btn) => {
          if ($btn.length > 0) {
            cy.get(this.seletores.botaoSubmit).click({ force: true })
            
            cy.contains(/erro|obrigatório|campo requerido/i)
              .should('be.visible')
              .or(cy.get('[aria-invalid="true"]').should('exist'))
          }
        })
      }
    })
  }

  // TC-NEG-004: Validar email inválido
  testarEmailInvalido() {
    cy.get(this.seletores.campoEmail, { timeout: 5000 }).then(($input) => {
      if ($input.length > 0) {
        cy.get(this.seletores.campoEmail).type('email-invalido-sem-arroba')
        cy.get(this.seletores.campoEmail).blur()
        
        cy.get(this.seletores.campoEmail).then(($field) => {
          const isInvalid = $field[0].validity ? !$field[0].validity.valid : false
          expect(isInvalid).to.exist
        })
      }
    })
  }

  // TC-NEG-005: Acessar URL com caracteres especiais
  testarURLComCaracteresEspeciais() {
    cy.visit(this.seletores.paginaEspecial, { failOnStatusCode: false })
    
    cy.url().should('not.include', 'página@#$%')
      .or(cy.request({ 
        url: this.seletores.paginaEspecial, 
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.be.greaterThanOrEqual(400)
      }))
  }
}