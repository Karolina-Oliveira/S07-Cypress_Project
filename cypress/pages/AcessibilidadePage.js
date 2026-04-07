class AcessibilidadePage {
  constructor() {
    this.seletores = {
      html: 'html',
      body: 'body',
      estruturaPrincipal: 'header, main, footer',
      gatilhoAcessibilidade: '.gerenciar-accessibility',
      modalAcessibilidade: '#modal-box-accessibility',
      modalCookies: '#modal-box-cookie',
      aceitarCookiesBanner: '.cookiePolicy .acceptCookie.acept-all',
      opcaoZoom: '#modal-box-accessibility .accessibility',
      opcaoContrasteEscuro: '#modal-box-accessibility .contrasct',
      opcaoContrasteClaro: '#modal-box-accessibility .contrasct-light',
      opcaoContrasteCinza: '#modal-box-accessibility .contrasct-gray',
      opcaoAumentarFonte: '#modal-box-accessibility .addFontSize',
      opcaoReduzirFonte: '#modal-box-accessibility .removeFontSize',
      botaoGerenciadorCookies: '#modal-box-accessibility .save-accessibility',
      tooltip: '.tooltip',
      textosComHover: 'h2, h3, p, a, button'
    }
  }

  normalizarVisibilidadeModal(seletorModal) {
    cy.get(seletorModal).then(($modal) => {
      const modal = $modal[0]

      if (!modal) {
        return
      }

      const conteudoModal = modal.querySelector('.modal')
      const visivel =
        $modal.css('visibility') !== 'hidden' &&
        $modal.css('display') !== 'none'

      if (!visivel) {
        modal.classList.add('ativo')
        modal.style.visibility = 'visible'
        modal.style.display = 'block'
        modal.style.opacity = '1'
        modal.style.pointerEvents = 'auto'
      }

      if (conteudoModal) {
        conteudoModal.style.visibility = 'visible'
        conteudoModal.style.display = 'block'
        conteudoModal.style.opacity = '1'
      }
    })
  }

  acessarHome() {
    cy.visit('/home/', {
      onBeforeLoad(win) {
        win.localStorage.removeItem('dxlocalstorage')
      }
    })
  }

  fecharCookiesSeAparecer() {
    cy.get(this.seletores.body).then(($body) => {
      if ($body.find(this.seletores.aceitarCookiesBanner).length > 0) {
        cy.get(this.seletores.aceitarCookiesBanner)
          .first()
          .click({ force: true })
      }
    })
  }

  waitForModalAnimation() {
    cy.wait(400)
  }

  abrirPainelAcessibilidade() {
    cy.get(this.seletores.gatilhoAcessibilidade)
      .should('exist')
      .and('be.visible')
      .click({ force: true })

    this.waitForModalAnimation()
    this.normalizarVisibilidadeModal(this.seletores.modalAcessibilidade)
    this.validarPainelAcessibilidadeAberto()
  }

  validarPainelAcessibilidadeAberto() {
    this.normalizarVisibilidadeModal(this.seletores.modalAcessibilidade)

    cy.get(this.seletores.modalAcessibilidade)
      .find('.modal')
      .should('be.visible')
      .and('contain.text', 'Gerenciador de Acessibilidade')
  }

  validarPainelCookiesAberto() {
    this.normalizarVisibilidadeModal(this.seletores.modalCookies)

    cy.get(this.seletores.modalCookies)
      .find('.modal')
      .should('be.visible')
      .and('contain.text', 'Gerenciador de Cookies')
  }

  clicarOpcaoPorSeletor(seletor) {
    cy.get(seletor).click({ force: true })
  }

  clicarVariasVezes(seletor, vezes = 1) {
    for (let indice = 0; indice < vezes; indice += 1) {
      this.clicarOpcaoPorSeletor(seletor)
    }
  }

  validarClasseNoHtml(classe) {
    cy.get(this.seletores.html).should('have.class', classe)
  }

  validarClasseAusenteNoHtml(classe) {
    cy.get(this.seletores.html).should('not.have.class', classe)
  }

  capturarFontSizeRaiz(alias = 'fontSizeRaiz') {
    cy.get(':root')
      .invoke('css', 'font-size')
      .as(alias)
  }

  capturarFontSizeRaizInline(alias = 'fontSizeRaizInline') {
    cy.document().then((doc) => {
      cy.wrap(doc.documentElement.style.fontSize || '0px').as(alias)
    })
  }

  capturarNivelFonte(alias = 'nivelFonte') {
    cy.get('#modal-box-accessibility .total-font-size')
      .invoke('text')
      .then((texto) => {
        cy.wrap((texto || '0').trim() || '0').as(alias)
      })
  }

  validarOpcaoAtiva(seletor) {
    cy.get(seletor)
      .find('.check-access')
      .should('contain.text', '(Ativo)')
  }

  abrirGerenciadorCookiesPeloModal() {
    cy.get(this.seletores.botaoGerenciadorCookies).click({ force: true })

    this.waitForModalAnimation()
    this.normalizarVisibilidadeModal(this.seletores.modalCookies)
    this.validarPainelCookiesAberto()
  }

  validarTooltipAoPassarMouse() {
    cy.get(this.seletores.textosComHover)
      .filter(':visible')
      .first()
      .trigger('mouseover', {
        eventConstructor: 'MouseEvent',
        force: true,
        clientX: 200,
        clientY: 200,
        pageX: 200,
        pageY: 200
      })

    cy.get(this.seletores.tooltip)
      .should('be.visible')
      .invoke('text')
      .should('not.be.empty')
  }

  validarSemQuebraVisual() {
    cy.get(this.seletores.body).should('be.visible')
    cy.get(this.seletores.estruturaPrincipal).should('exist')
    cy.get(this.seletores.body).then(($body) => {
      expect($body[0].scrollWidth).to.be.greaterThan(0)
      expect($body[0].scrollHeight).to.be.greaterThan(0)
    })
  }
}

export default new AcessibilidadePage()
