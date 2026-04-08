const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
  addCucumberPreprocessorPlugin
} = require('@badeball/cypress-cucumber-preprocessor')
const {
  createEsbuildPlugin
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')

function emModoBdd(config) {
  return `${config.env && config.env.bdd}` === 'true' || process.env.CYPRESS_bdd === 'true'
}

const permitirCypressEnv = process.env.CYPRESS_bdd === 'true'

module.exports = defineConfig({
  allowCypressEnv: permitirCypressEnv,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },

  e2e: {
    baseUrl: 'https://inatel.br',
    specPattern: 'cypress/sem-bdd/**/*.spec.js',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    screenshotOnRunFailure: true,
    video: false,
    retries: {
      runMode: 1,
      openMode: 0
    },
    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)

      const executarBdd = emModoBdd(config)

      if (executarBdd) {
        config.specPattern = 'cypress/bdd/features/**/*.feature'

        await addCucumberPreprocessorPlugin(on, config)

        on(
          'file:preprocessor',
          createBundler({
            plugins: [createEsbuildPlugin(config)]
          })
        )
      }

      return config
    }
  }
})
