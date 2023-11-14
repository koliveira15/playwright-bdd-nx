import { defineConfig } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { fileURLToPath } from 'url';

import { workspaceRoot } from '@nx/devkit';
import {defineBddConfig} from "playwright-bdd";

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const testDir = defineBddConfig({
  paths: ['./src/features/**/*.feature'],
  import: ['./src/steps/**/*.ts'],
  outputDir: './src/features/.generated',
  featuresRoot: './src/features'
});

console.log('Filename' + new URL('', import.meta.url).pathname)

export default defineConfig({
  ...nxE2EPreset(fileURLToPath(import.meta.url),
    { testDir }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx serve demo',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    cwd: workspaceRoot,
  },
});
