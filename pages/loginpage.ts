import { loginLocators } from "locators/loginlocators";
import { Page } from '@playwright/test';


export class LoginPage {
    readonly page: Page;

    constructor( page: Page) {
        this.page = page;
    }

    async enterUsername(username: string, password: string) {
        await this.page.fill(loginLocators.usernameInput, username);
        await this.page.fill(loginLocators.passwordInput, password);
        await this.page.click(loginLocators.loginButton);

    }

};

    