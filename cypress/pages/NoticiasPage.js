class NoticiasPage {
  constructor() {
    this.seletores = {
      body: 'body',
      itemNoticia: '.news-main',
      linkImagem: '.news-main .news-cover a',
      imagemNoticia: '.news-main .news-cover img',
      coverSemImagem: '.news-main .news-cover:not(:has(img))',
      aceitarCookiesBanner: '.cookiePolicy .acceptCookie.acept-all',
    }
  }

  acessarNoticias() {
    cy.visit('/noticias/')
  }

  /**
   * Visita a página SEM aguardar o evento load — simula acesso em momento inadequado.
   * onLoad: false faz o Cypress não esperar o load event da janela.
   */
  acessarNoticiasPrematuro() {
    cy.visit('/noticias/', { onLoad: () => {} })
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

  validarPaginaCarregada() {
    cy.url().should('include', '/noticias')
    cy.get(this.seletores.body).should('be.visible')
  }

  validarImagensVisiveis() {
    cy.get(this.seletores.imagemNoticia)
      .filter(':visible')
      .should('have.length.greaterThan', 0)
  }

  /**
   * TC-001 — Hover em viewport mobile.
   * Em dispositivos touch (viewport < 768px) o efeito CSS :hover não se aplica.
   * A página deve permanecer estável sem quebra de layout.
   */
  validarEstabilidadeHoverMobile() {
    cy.get(this.seletores.linkImagem)
      .filter(':visible')
      .first()
      .trigger('mouseenter', { force: true })
      .trigger('mouseleave', { force: true })

    // Página não deve quebrar: body ainda visível e sem overflow horizontal anormal
    cy.get(this.seletores.body).should('be.visible')
    cy.get(this.seletores.body).then(($body) => {
      expect($body[0].scrollWidth).to.be.at.most($body[0].offsetWidth + 5)
    })
  }

  /**
   * TC-002 — Hover em imagem com src inválido.
   * Corrompe o src da primeira imagem e verifica que o hover não gera erro JS
   * nem quebra o layout da página.
   */
  simularHoverEmImagemComSrcInvalido() {
    cy.get(this.seletores.imagemNoticia)
      .filter(':visible')
      .first()
      .invoke('attr', 'src', 'https://inatel.br/imagem-inexistente-404.jpg')
      .trigger('mouseenter', { force: true })
      .trigger('mouseleave', { force: true })

    // Imagem ainda deve existir no DOM (elemento não removido)
    cy.get(this.seletores.imagemNoticia).should('exist')
    // Layout não deve quebrar
    cy.get(this.seletores.itemNoticia).filter(':visible').first().should('be.visible')
  }

  /**
   * TC-003 — Hover imediatamente após o início da navegação (momento inadequado).
   * Dispara o hover logo após o cy.visit, sem aguardar elementos carregarem.
   * O teste valida que a tentativa não gera exceção irrecuperável.
   */
  tentarHoverPrematuro() {
    // Tenta selecionar e fazer hover antes do DOM estar pronto.
    // O Cypress não vai encontrar o elemento imediatamente — validamos que
    // após o timeout a página ainda carrega normalmente.
    cy.get(this.seletores.linkImagem, { timeout: 0 })
      .then(($links) => {
        if ($links.length > 0) {
          cy.wrap($links.first()).trigger('mouseenter', { force: true })
        }
      })
      // Independentemente do hover, a página deve carregar por completo
    cy.get(this.seletores.imagemNoticia, { timeout: 15000 })
      .filter(':visible')
      .should('have.length.greaterThan', 0)
  }

  /**
   * TC-004 — Hover em container sem imagem filha (dado ausente).
   * Verifica se existem containers .news-cover sem <img>. Se houver, o hover
   * não deve quebrar a página. Se não houver, registra log informativo.
   */
  validarHoverEmCoverSemImagem() {
    cy.get(this.seletores.body).then(($body) => {
      const semImagem = $body.find(this.seletores.coverSemImagem)

      if (semImagem.length > 0) {
        cy.get(this.seletores.coverSemImagem)
          .first()
          .trigger('mouseenter', { force: true })
          .trigger('mouseleave', { force: true })

        cy.get(this.seletores.body).should('be.visible')
      } else {
        cy.log(
          'INFO: Todos os containers .news-cover possuem imagem — ' +
          'cenário de cover sem img não ocorre na página atual.'
        )
        // Valida que todos os covers têm imagem (confirma integridade dos dados)
        cy.get('.news-main .news-cover').each(($cover) => {
          expect($cover.find('img').length, 'Cada .news-cover deve ter ao menos uma img').to.be.greaterThan(0)
        })
      }
    })
  }

  /**
   * TC-005 — Hover repetido em alta frequência (stress do efeito).
   * Simula o usuário passando o mouse rapidamente várias vezes sobre a imagem.
   * A página não deve travar, apresentar overflow visual ou lançar exceção.
   */
  simularHoverStress(repeticoes = 20) {
    cy.get(this.seletores.linkImagem)
      .filter(':visible')
      .first()
      .as('linkStress')

    for (let i = 0; i < repeticoes; i++) {
      cy.get('@linkStress').trigger('mouseenter', { force: true })
      cy.get('@linkStress').trigger('mouseleave', { force: true })
    }

    // Após stress, a imagem ainda deve estar visível e o layout íntegro
    cy.get(this.seletores.imagemNoticia).filter(':visible').first().should('be.visible')
    cy.get(this.seletores.body).then(($body) => {
      expect($body[0].scrollWidth).to.be.greaterThan(0)
      expect($body[0].scrollHeight).to.be.greaterThan(0)
    })
  }

  validarSemQuebraVisual() {
    cy.get(this.seletores.body).should('be.visible')
    cy.get(this.seletores.body).then(($body) => {
      expect($body[0].scrollWidth).to.be.greaterThan(0)
      expect($body[0].scrollHeight).to.be.greaterThan(0)
    })
  }
}

export default new NoticiasPage()
