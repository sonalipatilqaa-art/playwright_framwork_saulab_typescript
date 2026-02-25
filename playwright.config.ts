import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { logger } from "@utils/logger";

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 45 * 1000, // Increased to 45s for CI stability
  expect: {
    timeout: 7000 
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  /* FIX: Use 2 workers on CI. 
     Your previous config had 1, which makes execution very slow. 
  */
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  use: {
    baseURL: 'https://www.google.com/',
    /* FIX: Ensure headless is true for GitHub Actions 
    */
    headless: process.env.CI ? true : false, 
    trace: 'on-first-retry',
    locale:'en-IN',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000, // Give actions 15s to find elements
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  outputDir: 'test-results/',
};

export default config;