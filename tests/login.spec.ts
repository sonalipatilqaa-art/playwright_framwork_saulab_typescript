import { test, expect } from '@playwright/test';

test('Login Page has correct title and login form', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com');

    // Check that the page title is correct
    await expect(page).toHaveTitle('Swag Labs');

    // Check that the login form is visible
    const loginForm = page.locator('#login_button_container');
    await expect(loginForm).toBeVisible();

    // Check that the username and password fields are present
    const usernameField = page.locator('#user-name');
    const passwordField = page.locator('#password');
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    
    // Check that the login button is present
    const loginButton = page.locator('#login-button');
    await expect(loginButton).toBeVisible();
});
