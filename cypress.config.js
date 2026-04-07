const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,

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
    }
  }
})