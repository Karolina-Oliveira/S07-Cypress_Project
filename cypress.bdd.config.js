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

  e2e: {
    baseUrl: 'https://inatel.br',
    specPattern: 'cypress/bdd/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',

    async setupNodeEvents(on, config) {
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