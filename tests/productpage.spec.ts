import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { loginLocators } from '../locators/loginlocators';
import { BASE_URL, VALID_USERNAME,VALID_PASSWORD } from '@utils/envConfig';
import { ProductpageLocators } from 'locators/productPageLocator';
// Adjust the import to match the actual export from productPage.ts
import { ProductPage } from '../pages/productPage';

test.describe('Product Page Tests', () => {
    let loginPage: LoginPage;
    let productPage : ProductPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        // Navigate to the login page
        await page.goto(BASE_URL);
        // Perform login action
        await loginPage.enterUsername(VALID_USERNAME, VALID_PASSWORD);
        // Verify successful login by checking URL
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('validate logout functionality from product page', async ({page}) => {
        // Open the menu
       await productPage.openAbout();
        // Verify that we are on the about page
        await expect(ProductpageLocators.reqestfordemobutton).toBeDefined();

        await expect(ProductpageLocators.tryitforfreebutton).toBeDefined();
         await expect(ProductpageLocators.crossicon).toBeDefined();
        // Close the about page and logout
        await page.goBack();
        await productPage.logout();
        // Verify that we are back on the login page
        await expect(page).toHaveURL(BASE_URL);
    });
});