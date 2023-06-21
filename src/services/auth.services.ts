import {AuthDataInterface} from '../reactRedux';
import cryptoAES from '../utils/cryptoAES';
import {
  IDENTIFIER_BRANCH_DOMAIN,
  IDENTIFIER_KEY,
  IDENTIFIER_KEY_BRANCH,
} from '../config';
import {ApiToken} from '../http/api-token';
import {ApiAurum} from '../http/api-aurum';
import {ApiLogin} from '../http/api-login';
import {HttpClient} from '../http/http-client';

/**
 * Pre Signup
 * @param user
 * @returns
 */
async function preSignUp(user: AuthDataInterface): Promise<any> {
  // We instance TOKEN API (https://token.aurumcore.com) and then we get token
  const tokenResponse = await ApiToken.getInstance().getToken();

  if (tokenResponse === undefined)
    return Promise.reject(new Error('preSignUp:/token'));

  const {access_token} = tokenResponse.data;

  // We instance main API (https://api.aurumcore.com:9095) and then we pre-register a final user.
  // Is important set the token before creting instance of Aurum API.
  HttpClient.bearerToken = access_token;

  const registerResponse = await ApiAurum.getInstance().postRequest(
    '/onboarding/1.0.0/register/create',
    {
      branchId: 'pMaCKHWPSuCGWmPzNn3DTvma2xR9AyNqX5bX',
      email: user.email,
      password: cryptoAES(user.password, IDENTIFIER_KEY),
      termsAndConditionsId: '61957402ea01ff5337e9af11',
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
  const tokenResponse = await ApiLogin.getInstance().postRequest('/token', {
    grant_type: 'password',
    password: cryptoAES(
      user.password,
      `${user.email.split('@')[0]}:${IDENTIFIER_KEY_BRANCH}`,
    ),
    username: user.email + IDENTIFIER_BRANCH_DOMAIN,
    scope:
      'CTP_cards_role user_profile_role use_payments CTP_account_role update_info_scope use_otp',
    longitude: '41',
    latitude: '40',
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
