const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
  addCucumberPreprocessorPlugin
} = require('@badeball/cypress-cucumber-preprocessor')
const {
  createEsbuildPlugin
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')

module.exports = defineConfig({
  allowCypressEnv: true,
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
    specPattern: 'cypress/bdd/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',

    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)

      await addCucumberPreprocessorPlugin(on, config)

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      )

      return config
    }
  }
})
