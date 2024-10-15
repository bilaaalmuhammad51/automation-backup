const { defineConfig } = require("cypress");
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions')

module.exports = defineConfig({
  projectId: "rxazdq",
  defaultCommandTimeout: 90000,
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  retries: 1,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'MarketScale QA Automation',
    embeddedScreenshots: true,
    inlineAssets: true,
    //saveAllAttempts: false,
    videoOnFailOnly: true,
  },
  viewportWidth: 1366, 
  viewportHeight: 768,
  e2e: {
    experimentalWebKitSupport: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser, launchOptions) => {
        // if (browser.family === 'chromium' && browser.name !== 'electron') {
        //   // in Chromium, preferences can exist in Local State, Preferences, or Secure Preferences
        //   // via launchOptions.preferences, these can be acccssed as `localState`, `default`, and `secureDefault`

        //   // for example, to set `somePreference: true` in Preferences:
        //   //launchOptions.preferences.default['preference'] = true
        //   return launchOptions
        // }

        if (browser.family === 'firefox') {
          // launchOptions.preferences is a map of preference names to values
          launchOptions.preferences['permissions.default.camera'] = true,
          launchOptions.preferences['permissions.default.microphone'] = true
          return launchOptions
        }

        // if (browser.name === 'electron') {
        //   // launchOptions.preferences is a `BrowserWindow` `options` object
        //   //launchOptions.preferences.darkTheme = true

        //   return launchOptions
        // }
      })

      require('cypress-mochawesome-reporter/plugin')(on);
      cypressBrowserPermissionsPlugin(on, config);
      
    },
    env: {
      testEnv: "sandbox",
      browserPermissions: {
        notifications: "allow",
        camera: "allow",
        microphone: "allow",
        images: "allow"
      }
    },
  },
  experimentalWebKitSupport: true
});
