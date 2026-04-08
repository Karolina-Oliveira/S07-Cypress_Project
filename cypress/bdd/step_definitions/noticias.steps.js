import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import noticiasPage from '../../pages/NoticiasPage'

Given('que o usuario acessa a pagina de noticias com viewport desktop', () => {
  cy.viewport(1440, 900)
  noticiasPage.acessarNoticias()
})

Given('fecha o banner de cookies na pagina de noticias', () => {
  noticiasPage.fecharCookiesSeAparecer()
})

// TC-011 — Viewport mobile (contexto inválido para hover CSS)
When('o usuario redimensiona para viewport mobile', () => {
  cy.viewport(375, 667)
  noticiasPage.validarPaginaCarregada()
})

Then('o hover na imagem nao deve causar quebra de layout', () => {
  noticiasPage.validarEstabilidadeHoverMobile()
  noticiasPage.validarSemQuebraVisual()
})

// TC-012 — Src inválido (dado malformado)
When('o usuario tenta hover em uma imagem com src invalido', () => {
  noticiasPage.simularHoverEmImagemComSrcInvalido()
})

Then('a pagina nao deve quebrar e a imagem deve permanecer no DOM', () => {
  noticiasPage.validarSemQuebraVisual()
})

// TC-013 — Hover prematuro (momento inadequado)
When('o usuario tenta hover prematuramente apos a navegacao', () => {
  cy.visit('/noticias/')
  noticiasPage.tentarHoverPrematuro()
})

Then('a pagina deve carregar normalmente mesmo apos o hover prematuro', () => {
  noticiasPage.validarSemQuebraVisual()
})

// TC-014 — Container sem imagem (dado ausente)
When('o usuario tenta hover em container de noticia sem imagem', () => {
  noticiasPage.validarHoverEmCoverSemImagem()
})

Then('a pagina nao deve quebrar e deve validar integridade dos containers', () => {
  noticiasPage.validarSemQuebraVisual()
})

// TC-015 — Hover em alta frequência (stress)
When('o usuario simula hover repetido em alta frequencia', () => {
  noticiasPage.simularHoverStress(20)
})

Then('a pagina deve permanecer estavel apos o stress de hover', () => {
  noticiasPage.validarSemQuebraVisual()
})
