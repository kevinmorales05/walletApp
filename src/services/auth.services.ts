import {AuthDataInterface} from '../reactRedux';
import cryptoAES from '../utils/cryptoAES';
//import {IDENTIFIER_BRANCH_DOMAIN, IDENTIFIER_KEY_BRANCH} from '../config';
import {ApiToken} from '../http/api-token';
import {ApiAurum} from '../http/api-aurum';
import {ApiLogin} from '../http/api-login';
import {HttpClient} from '../http/http-client';

let IDENTIFIER_KEY_BRANCH = 'WsYcyLNk5JFubvXMFPOE6XGnrJIa';
let IDENTIFIER_BRANCH_DOMAIN = ':@liverpool.com';
let SECRET = 'l1v3rp00l';
/**
 * Pre Signup
 * @param user
 * @returns
 */
let IDENTIFIER_KEY = 'lJb8nqGOFvAXwwLEm4cgvcA9OyQa';
async function preSignUp(user: AuthDataInterface): Promise<any> {
  let pass_encript = cryptoAES(user.password, SECRET, user.email);
  //console.log("pwd encrypted ", JSON.stringify(pass_encript));

  try {
    const tokenResponse = await ApiToken.getInstance().getToken(
      `${user.email}:@liverpool.com`,
      pass_encript,
    );
    console.log('TOKEN response ', tokenResponse);

    if (tokenResponse === undefined)
      return Promise.reject(new Error('preSignUp:/token'));

    const {access_token} = tokenResponse.data;

    // We instance main API (https://api.aurumcore.com:9095) and then we pre-register a final user.
    // Is important set the token before creting instance of Aurum API.
    HttpClient.bearerToken = access_token;
  } catch (error) {
    console.log('error token ', error);
  }

  const registerResponse = await ApiAurum.getInstance().postRequest(
    '/onboarding/1.0.0/register/create',
    {
      branchId: 'pMaCKHWPSuCGWmPzNn3DTvma2xR9AyNqX5bX',
      email: user.email,
      password: pass_encript,
      termsAndConditionsId: '61957402ea01ff5337e9af11',
      personType: '1',
    },
  );

  if (registerResponse === undefined)
    return Promise.reject(new Error('preSignUp:register/create'));

  const {data} = registerResponse;

  return data;
}

/**
 * Main Login.
 * @param user
 */
async function login(user: AuthDataInterface): Promise<any> {
  ApiAurum.classInstance = undefined; // Important!
  // We instance TOKEN API (https://token.aurumcore.com) and then we get token
  let pass_encript = cryptoAES(user.password, SECRET, user.email);
  const tokenResponse = await ApiLogin.getInstance().postRequest('/token', {
    grant_type: 'password',
    password: pass_encript,
    username: user.email + ':@liverpool.com',
    scope:
      'use_otp update_info_scope use_accounts use_payments use_profile use_cards',
    longitude: '90',
    latitude: '90',
  });

  if (tokenResponse?.data) {
    const {access_token} = tokenResponse.data;
    // We only need set the access_token.
    HttpClient.bearerToken = access_token;
  }

  return tokenResponse;
}

/**
 * Function to validate sended OTP via email.
 * @param otp
 * @returns
 */
async function otpValidate(otp: number): Promise<any> {
  const response = await ApiAurum.getInstance().postRequest(
    '/onboarding/1.0.0/otp/validate',
    {
      otp,
    },
  );

  if (response === undefined)
    return Promise.reject(new Error('otpValidate:/otp/validate'));

  return response;
}

/**
 * Function to update user info.
 * @param user
 * @returns
 */
async function updateInfo(user: AuthDataInterface): Promise<any> {
  const response = await ApiAurum.getInstance().postRequest(
    '/onboarding/1.0.0/register/updateInfo',
    user,
  );

  if (response === undefined)
    return Promise.reject(new Error('updateInfo:/register/updateInfo'));

  const {data} = response;
  return data;
}

/**
 * Function to send otp.
 * @param channelId
 * channelId = 1: email
 * channelId = 2: sms
 * @returns
 */
async function sendOtp(channelId: number): Promise<any> {
  const response = await ApiAurum.getInstance().postRequest(
    '/onboarding/1.0.0/otp/send',
    {
      channelId,
    },
  );

  if (response === undefined)
    return Promise.reject(new Error('sendOtp:/otp/send'));

  return response;
}

export const authServices = {
  login,
  otpValidate,
  preSignUp,
  updateInfo,
  sendOtp,
};
