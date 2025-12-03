import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://green-mart-seven.vercel.app/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js'
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})

