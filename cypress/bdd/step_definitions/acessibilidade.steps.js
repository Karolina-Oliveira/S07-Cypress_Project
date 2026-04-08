import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import acessibilidadePage from '../../pages/AcessibilidadePage'

const estado = {}

const validarVisibilidadeDoZoom = () => {
  cy.get('body').then(($body) => {
    estado.zoomDisponivel = $body[0].offsetWidth >= 1280

    cy.get(acessibilidadePage.seletores.opcaoZoom)
      .should(estado.zoomDisponivel ? 'be.visible' : 'not.be.visible')
  })
}

Given('que o usuario acessa a home do Inatel com viewport desktop', () => {
  cy.viewport(1440, 900)
  acessibilidadePage.acessarHome()
})

Given('fecha o banner de cookies se aparecer', () => {
  acessibilidadePage.fecharCookiesSeAparecer()
})

Given('que o usuario captura o tamanho atual da fonte', () => {
  acessibilidadePage.capturarFontSizeRaizInline('fontAntes')
  acessibilidadePage.capturarNivelFonte('nivelAntes')
})

When('o usuario abre o gerenciador de acessibilidade', () => {
  acessibilidadePage.abrirPainelAcessibilidade()
})

When('o usuario ativa o contraste escuro', () => {
  acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoContrasteEscuro)
})

When('o usuario ativa o contraste claro', () => {
  acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoContrasteClaro)
})

When('o usuario desativa o contraste claro', () => {
  acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoContrasteClaro)
})

When('o usuario ativa o contraste cinza', () => {
  acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoContrasteCinza)
})

When('o usuario aumenta o tamanho da fonte', () => {
  acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoAumentarFonte)
})

When('captura a fonte apos o aumento', () => {
  acessibilidadePage.capturarFontSizeRaizInline('fontAumentada')
  acessibilidadePage.capturarNivelFonte('nivelAumentado')
})

When('reduz o tamanho da fonte', () => {
  acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoReduzirFonte)
})

When('ativa o contraste escuro', () => {
  acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoContrasteEscuro)
})

When('o usuario ativa o zoom por hover se estiver disponivel', () => {
  cy.get('body').then(($body) => {
    estado.zoomDisponivel = $body[0].offsetWidth >= 1280

    if (estado.zoomDisponivel) {
      acessibilidadePage.clicarOpcaoPorSeletor(acessibilidadePage.seletores.opcaoZoom)
    }
  })
})

When('o usuario abre o gerenciador de cookies pelo modal de acessibilidade', () => {
  acessibilidadePage.abrirGerenciadorCookiesPeloModal()
})

Then('os controles principais de acessibilidade devem ser exibidos', () => {
  validarVisibilidadeDoZoom()
  cy.get(acessibilidadePage.seletores.opcaoContrasteEscuro).should('be.visible')
  cy.get(acessibilidadePage.seletores.opcaoContrasteClaro).should('be.visible')
  cy.get(acessibilidadePage.seletores.opcaoContrasteCinza).should('be.visible')
  cy.get(acessibilidadePage.seletores.opcaoAumentarFonte).should('be.visible')
  cy.get(acessibilidadePage.seletores.opcaoReduzirFonte).should('be.visible')
  acessibilidadePage.validarSemQuebraVisual()
})

Then('a pagina deve aplicar o contraste escuro', () => {
  acessibilidadePage.validarClasseNoHtml('dxaccess')
  acessibilidadePage.validarSemQuebraVisual()
})

Then('a pagina deve aplicar o contraste claro', () => {
  acessibilidadePage.validarClasseNoHtml('dxaccess-light')
  acessibilidadePage.validarClasseAusenteNoHtml('dxaccess-gray')
  acessibilidadePage.validarSemQuebraVisual()
})

Then('a pagina deve aplicar o contraste cinza', () => {
  acessibilidadePage.validarClasseNoHtml('dxaccess-gray')
  acessibilidadePage.validarClasseAusenteNoHtml('dxaccess-light')
  acessibilidadePage.validarSemQuebraVisual()
})

Then('o tamanho da fonte deve aumentar', () => {
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

Then('o tamanho da fonte deve diminuir', () => {
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

Then('o comportamento de zoom por hover deve ser validado', () => {
  if (estado.zoomDisponivel) {
    acessibilidadePage.validarOpcaoAtiva(acessibilidadePage.seletores.opcaoZoom)
    acessibilidadePage.validarTooltipAoPassarMouse()
  } else {
    cy.get(acessibilidadePage.seletores.opcaoZoom).should('not.be.visible')
  }

  acessibilidadePage.validarSemQuebraVisual()
})

Then('o gerenciador de cookies deve ser exibido', () => {
  acessibilidadePage.validarPainelCookiesAberto()
})
