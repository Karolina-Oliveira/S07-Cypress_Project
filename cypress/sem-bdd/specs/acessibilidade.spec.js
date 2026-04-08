import acessibilidadePage from '../../pages/AcessibilidadePage'

describe('Acessibilidade - Site do Inatel', () => {
  const validarVisibilidadeDoZoom = () => {
    cy.get('body').then(($body) => {
      const zoomDeveEstarVisivel = $body[0].offsetWidth >= 1280

      cy.get(acessibilidadePage.seletores.opcaoZoom)
        .should(zoomDeveEstarVisivel ? 'be.visible' : 'not.be.visible')
    })
  }

  beforeEach(() => {
    cy.viewport(1440, 900)
    acessibilidadePage.acessarHome()
    acessibilidadePage.fecharCookiesSeAparecer()
  })

  it('TC-002 - deve abrir o gerenciador de acessibilidade com os controles principais', () => {
    acessibilidadePage.abrirPainelAcessibilidade()

    validarVisibilidadeDoZoom()
    cy.get(acessibilidadePage.seletores.opcaoContrasteEscuro).should('be.visible')
    cy.get(acessibilidadePage.seletores.opcaoContrasteClaro).should('be.visible')
    cy.get(acessibilidadePage.seletores.opcaoContrasteCinza).should('be.visible')
    cy.get(acessibilidadePage.seletores.opcaoAumentarFonte).should('be.visible')
    cy.get(acessibilidadePage.seletores.opcaoReduzirFonte).should('be.visible')

    acessibilidadePage.validarSemQuebraVisual()
  })

  it('TC-003 - deve aplicar contraste escuro no html', () => {
    acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoContrasteEscuro)

    acessibilidadePage.validarClasseNoHtml('dxaccess')
    acessibilidadePage.validarSemQuebraVisual()
  })

  it('TC-004 - deve aplicar contraste claro e contraste cinza de forma independente', () => {
    acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoContrasteClaro)
    acessibilidadePage.validarClasseNoHtml('dxaccess-light')
    acessibilidadePage.validarClasseAusenteNoHtml('dxaccess-gray')

    acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoContrasteClaro)
    acessibilidadePage.validarClasseAusenteNoHtml('dxaccess-light')

    acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoContrasteCinza)
    acessibilidadePage.validarClasseNoHtml('dxaccess-gray')
    acessibilidadePage.validarSemQuebraVisual()
  })

  it('TC-005 - deve aumentar o tamanho base da fonte', () => {
    acessibilidadePage.capturarFontSizeRaizInline('fontAntes')
    acessibilidadePage.capturarNivelFonte('nivelAntes')

    acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoAumentarFonte)
    acessibilidadePage.capturarFontSizeRaizInline('fontDepois')
    acessibilidadePage.capturarNivelFonte('nivelDepois')

    cy.get('@fontAntes').then((antes) => {
      cy.get('@fontDepois').then((depois) => {
        expect(parseFloat(depois)).to.be.greaterThan(parseFloat(antes))
      })
    })

    cy.get('@nivelAntes').then((antes) => {
      cy.get('@nivelDepois').then((depois) => {
        expect(parseInt(depois, 10)).to.be.greaterThan(parseInt(antes, 10))
      })
    })

    acessibilidadePage.validarSemQuebraVisual()
  })

  it('TC-006 - deve reduzir o tamanho base da fonte apos um aumento', () => {
    acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoAumentarFonte)
    acessibilidadePage.capturarFontSizeRaizInline('fontAumentada')
    acessibilidadePage.capturarNivelFonte('nivelAumentado')

    acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoReduzirFonte)
    acessibilidadePage.capturarFontSizeRaizInline('fontReduzida')
    acessibilidadePage.capturarNivelFonte('nivelReduzido')

    cy.get('@fontAumentada').then((aumentada) => {
      cy.get('@fontReduzida').then((reduzida) => {
        expect(parseFloat(reduzida)).to.be.lessThan(parseFloat(aumentada))
      })
    })

    cy.get('@nivelAumentado').then((aumentado) => {
      cy.get('@nivelReduzido').then((reduzido) => {
        expect(parseInt(reduzido, 10)).to.be.lessThan(parseInt(aumentado, 10))
        expect(parseInt(reduzido, 10)).to.be.at.least(0)
      })
    })

    acessibilidadePage.validarSemQuebraVisual()
  })

  it('TC-007 - deve combinar aumento de fonte com contraste escuro', () => {
    acessibilidadePage.capturarFontSizeRaizInline('fontAntes')
    acessibilidadePage.capturarNivelFonte('nivelAntes')

    acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoAumentarFonte)
    acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoContrasteEscuro)
    acessibilidadePage.capturarFontSizeRaizInline('fontDepois')
    acessibilidadePage.capturarNivelFonte('nivelDepois')

    acessibilidadePage.validarClasseNoHtml('dxaccess')

    cy.get('@fontAntes').then((antes) => {
      cy.get('@fontDepois').then((depois) => {
        expect(parseFloat(depois)).to.be.greaterThan(parseFloat(antes))
      })
    })

    cy.get('@nivelAntes').then((antes) => {
      cy.get('@nivelDepois').then((depois) => {
        expect(parseInt(depois, 10)).to.be.greaterThan(parseInt(antes, 10))
      })
    })

    acessibilidadePage.validarSemQuebraVisual()
  })

  it('TC-008 - deve ativar zoom ao passar o mouse e exibir tooltip', () => {
    cy.get('body').then(($body) => {
      const zoomDisponivel = $body[0].offsetWidth >= 1280

      if (zoomDisponivel) {
        acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoZoom)
        acessibilidadePage.validarOpcaoAtiva(acessibilidadePage.seletores.opcaoZoom)
        acessibilidadePage.validarTooltipAoPassarMouse()
      } else {
        cy.get(acessibilidadePage.seletores.opcaoZoom).should('not.be.visible')
      }
    })

    acessibilidadePage.validarSemQuebraVisual()
  })

  it('TC-009 - deve abrir o gerenciador de cookies a partir do modal de acessibilidade', () => {
    acessibilidadePage.abrirGerenciadorCookiesPeloModal()
    acessibilidadePage.validarPainelCookiesAberto()
  })
})
