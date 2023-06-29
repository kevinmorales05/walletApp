import {AxiosRequestConfig} from 'axios';
// import {API_URL, API_URL_TOKEN, API_ZIP_CODES_URL} from '../config';
import {API_ZIP_CODES_URL} from '../config';

import {HttpClient} from './http-client';

// const API_URL_TOKEN = 'https://0b667aaa-b6d3-4e79-9fa0-50d18eb5603e.mock.pstmn.io';
 //const API_URL_TOKEN = 'https://token.aurumcore.com';
// const API_URL = 'https://0b667aaa-b6d3-4e79-9fa0-50d18eb5603e.mock.pstmn.io';
// const API_URL = 'https://api.aurumcore.com:9095';
// const API_ZIP_CODES_URL = 'https://mexico-zip-codes.p.rapidapi.com';
// export const IDENTIFIER_KEY = 'pgRSwptlOM9KYf0gtCT9bBTYllwa';
// the next key is used to encrypt password in the main login, is used as the following way:
// example ===> mariano_alberto2020:l1v3rp00l
// export const IDENTIFIER_KEY_BRANCH = 'l1v3rp00l';
// export const IDENTIFIER_BRANCH_DOMAIN = '@liverpool.com';
let API_URL_TOKEN = 'https://aurumcore-auth.cospace.cloud/tenant/liverpool.com';

let API_URL = 'https://aurumcore-auth.cospace.cloud';

/**
 * |^^^^^| Config to get Admin's token that allows to pre-register new users.
 * |  1  | Should not be changed.
 * |,,,,,|
 */
export const ApiConfigGrantCredentials: AxiosRequestConfig = {
  baseURL: API_URL_TOKEN,
  //   The "data" property was removed because even though it is part of the AxiosRequestConfig,
  //   there is a known issue: https://github.com/axios/axios/issues/362
  //   data: qs.stringify({
  //   grant_type: 'client_credentials',
  //   longitude: '23',
  //   latitude: '43',
  // }),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic bEpiOG5xR09GdkFYd3dMRW00Y2d2Y0E5T3lRYTpXc1ljeUxOazVKRnVidlhNRlBPRTZYR25ySklh',
  },
};

/**
 * |^^^^^| Use this config to get token for COMMON LOGIN
 * |  2  | (Only after user has been registered and confirmed his account succesfully).
 * |,,,,,|
 */
export const ApiConfigGrantPassword: AxiosRequestConfig = {
  baseURL: API_URL_TOKEN,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization:
      'Basic cGdSU3dwdGxPTTlLWWYwZ3RDVDliQlRZbGx3YTppQkFObFNvWGJNZ090d0dyWU1WNUFwYlNKU0Fh',
  },
};

/**
 * API AURUM
 * |^^^^^| Use this to consume every API Aurum context.
 * |  3  | Use this to pre-register final users.
 * |,,,,,|
 */
export const ApiConfig = (): AxiosRequestConfig => {
  if (HttpClient.bearerToken) {
    // for every API Aurum context (accounts, onboarding, cards, payments, etc.)
    return {
      baseURL: API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HttpClient.bearerToken}`,
      },
    };
  }
  // Use only to /register/create endpoint
  return {
    baseURL: API_URL,
  };
};

/**
 * API ZIP CODES
 * |^^^^^| Use this to consume zip codes.
 * |  4  |
 * |,,,,,|
 */





export const ApiZipCodesConfig: AxiosRequestConfig = {
  baseURL: API_ZIP_CODES_URL,
  headers: {
    'X-RapidAPI-Host': 'mexico-zip-codes.p.rapidapi.com',
    'X-RapidAPI-Key': 'ff2d33b66amsh640bbb4ac2d7893p1077aajsn9788b7e75570',
  },
};
