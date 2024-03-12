const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
    },
    experimentalStudio: true,
    viewportWidth: 1024,
    viewportHeight: 768
  },
});
