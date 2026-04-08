const { spawn } = require('node:child_process')
const path = require('node:path')

const modo = process.argv[2] === 'open' ? 'open' : 'run'

function resolverCypressBin() {
  try {
    return require.resolve('cypress/bin')
  } catch {
    const cypressMain = require.resolve('cypress')
    return path.join(path.dirname(cypressMain), '..', 'bin', 'cypress')
  }
}

const cypressBin = resolverCypressBin()

const processo = spawn(process.execPath, [cypressBin, modo], {
  stdio: 'inherit',
  windowsHide: false,
  env: {
    ...process.env,
    CYPRESS_bdd: 'true'
  }
})

processo.on('error', (erro) => {
  console.error('Falha ao iniciar o Cypress em modo BDD.')
  console.error(erro)
  process.exit(1)
})

processo.on('exit', (codigo) => {
  process.exit(codigo ?? 1)
})
