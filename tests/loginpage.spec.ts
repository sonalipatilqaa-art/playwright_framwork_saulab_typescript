import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { loginLocators } from '../locators/loginlocators';
import { BASE_URL, VALID_USERNAME,VALID_PASSWORD } from '@utils/envConfig';

test('Login Page has correct title and login form', async ({page}) => {
    const loginPage = new LoginPage(page);
    // Navigate to the login page
    await page.goto(BASE_URL);

    // Check that the page title is correct
    await expect(page).toHaveTitle('Swag Labs');
    
    // Check that the login form is visible
    const loginForm = page.locator('#login_button_container');
    await expect(loginForm).toBeVisible();

    // Perform login action
    await loginPage.enterUsername(VALID_USERNAME, VALID_PASSWORD);

    // Verify successful login by checking URL
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});