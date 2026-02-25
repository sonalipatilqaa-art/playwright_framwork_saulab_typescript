import { expect, Locator, Page } from '@playwright/test';
import { PageBase } from '@pages/page-base';

export class HomePage extends PageBase {

    readonly searchInput: Locator;
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        super(page);
        // Best Practice: Use getByRole for more resilient locators
        this.searchInput = page.getByRole('combobox', { name: 'Search' });
        
        // Locator for the Google Consent/Cookie popup button
        // This handles multiple languages and regions common in CI runners
        this.acceptCookiesButton = page.getByRole('button', { name: /Accept all|I agree|Agree/i });
    }

    async open() {
        await this.page.goto('/');
        
        // FIX: Handle the Consent Modal if it appears
        // Using isVisible() prevents the test from failing if the popup doesn't show up
        if (await this.acceptCookiesButton.isVisible({ timeout: 5000 })) {
            this.logger.info('Consent modal detected, clicking Accept.');
            await this.acceptCookiesButton.click();
        }
        
        this.logger.info('Google home page opened');
    }

    async verifyTitle() {
        // Use web-first assertions for better stability in CI
        await expect(this.page).toHaveTitle('Google');
        this.logger.info('Title verified');
    }

    async search(text: string) {
        // Ensure the input is ready before typing
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.fill(text);
        await this.searchInput.press('Enter');
        this.logger.info(`Search for "${text}" started`);
    }
}