import {test,expect} from '@playwright/test';
import { ProductpageLocators } from '../locators/productPageLocator';
import { BASE_URL, VALID_USERNAME,VALID_PASSWORD } from '@utils/envConfig';
import { LoginPage } from '../pages/loginpage';
import { loginLocators } from 'locators/loginlocators';

export class ProductPage {
    readonly page: any;
    
    constructor(page: any) {
        this.page = page;
    }
      async logout() {
        await this.page.locator(ProductpageLocators.settingicon).click();
        await this.page.locator(ProductpageLocators.logoutlink).click();
        await expect(this.page).toHaveURL(BASE_URL);
    }

    async openAbout() 
    {
{
    // First, open the hamburger menu
   // await this.page.locator('#react-burger-menu-btn').click();
    
    // Wait for the menu to be visible
   // await this.page.locator('.bm-menu').waitFor({ state: 'visible' });
    
    // Now click the About link
    //await this.page.locator(ProductpageLocators.aboutlink).click();
    
    //await expect(this.page).toHaveURL('https://saucelabs.com/');
}
        await this.page.locator(ProductpageLocators.settingicon).click();
        await this.page.locator(ProductpageLocators.menu).waitFor({ state: 'visible' });
         await this.page.locator(ProductpageLocators.aboutlink).click();

        await expect(this.page).toHaveURL('https://saucelabs.com/');
    }


    async validateProductDetails() {
        const productName = await this.page.locator(ProductpageLocators.productname).first().allTextContents();
        const productDescription = await this.page.locator(ProductpageLocators.productdescription).first().allTextContents();
        const productPrice = await this.page.locator(ProductpageLocators.productprice).first().allTextContents();
         const productaddtocart= await this.page.locator(ProductpageLocators.addtocartbutton).first().allTextContents();
   if(productName.length > 0){
    console.log('Product Name:', productName[0]);
   }
   if(productDescription.length > 0){
    console.log('Product Description:', productDescription[0]);
   }
    if(productPrice.length > 0){
     console.log('Product Price:', productPrice[0]);
    }
   if(productaddtocart.length > 0){
    console.log('Add to Cart Button Text:', productaddtocart[0]);
   }

   if (productName.length === 0 || productDescription.length === 0 || productPrice.length === 0) {
    throw new Error('One or more product details are missing');
  }

         expect(productName).not.toBeNull();
        expect(productDescription).not.toBeNull();
        expect(productPrice).not.toBeNull();
    }
};