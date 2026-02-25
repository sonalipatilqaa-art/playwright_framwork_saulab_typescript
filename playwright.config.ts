import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { logger } from "@utils/logger";


const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 60 * 1000, // Increased to 60s as Google redirects can be slow in CI
  expect: {
    timeout: 10000 
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['./utils/testMailReporter.ts']
  ],
  use: {
    baseURL: 'https://www.google.com/',
    // Force headless for CI to avoid XServer errors
    headless: process.env.CI ? true : false, 
    trace: 'on-first-retry',
    locale: 'en-IN',
    timezoneId: 'Asia/Kolkata',
    screenshot: 'on',
    video: 'on',
    actionTimeout: 20000, // Increased to 20s to allow for modal handling
    viewport: { width: 1280, height: 720 },
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