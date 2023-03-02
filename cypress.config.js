const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fursej',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/E2E/*.js',
    screenshotsFolder: 'cypress/screenshots'
  },
});
