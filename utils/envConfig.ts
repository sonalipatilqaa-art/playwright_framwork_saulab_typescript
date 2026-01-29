
const Env_url={
    QA_URL: 'https://qa.saucedemo.com/',
    DEV_URL: 'https://dev.saucedemo.com/',
    STAGING_URL: 'https://staging.saucedemo.com/',
    PROD_URL: 'https://www.saucedemo.com/'
};

const ENV = process.env.ENVIRONMENT || 'PROD';

export const BASE_URL=Env_url[ENV as keyof typeof Env_url] || Env_url.PROD_URL;

//npm install --save-dev @types/node  ----for process.

//export const BASE_URL='https://www.saucedemo.com/';
export const VALID_USERNAME='standard_user';
export const VALID_PASSWORD='secret_sauce';
//export const INVALID_USERNAME='invalid_user';
//export const INVALID_PASSWORD='invalid_password';
//export const LOCKED_OUT_USERNAME='locked_out_user';
//export const LOCKED_OUT_PASSWORD='secret_sauce';
//export const ERROR_MESSAGE_TEXT='Epic sadface: Sorry, this user has been locked out.';
//export const INVENTORY_URL='https://www.saucedemo.com/inventory.html';

