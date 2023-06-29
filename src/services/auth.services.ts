import {AuthDataInterface} from '../reactRedux';
import cryptoAES from '../utils/cryptoAES';
import cryptoAESauth from '../utils/cryptpAESauth';

import {ApiAurum} from '../http/api-aurum';

import {HttpClient} from '../http/http-client';
import qs from 'qs';
import axios from 'axios';

let SECRET = 'l1v3rp00l';
/**
 * Pre Signup
 * @param user
 * @returns
 */

async function preSignUp(user: AuthDataInterface): Promise<any> {
  const tokenResponse = axios(setAxiosConfig(user, 'signUp'))
    .then(function (response) {
      console.log('desde signUp', JSON.stringify(response.data));
      HttpClient.bearerToken = response.data.access_token;
      console.log('tokk', HttpClient.bearerToken);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  console.log('RESPONSE ', JSON.stringify(tokenResponse, null, 3));

  // try {
  //   const tokenResponse = await ApiToken.getInstance().getToken(
  //     `${user.email}:@liverpool.com`,
  //     pass_encript,
  //   );
  //   console.log('TOKEN response ', tokenResponse);

  //   if (tokenResponse === undefined)
  //     return Promise.reject(new Error('preSignUp:/token'));

  //   const {access_token} = tokenResponse.data;

  //   // We instance main API (https://api.aurumcore.com:9095) and then we pre-register a final user.
  //   // Is important set the token before creting instance of Aurum API.
  //   HttpClient.bearerToken = access_token;
  // } catch (error) {
  //   console.log('error token ', error);
  // }
  const registerResponse = axios(
    setAxiosConfigAuthServices(user, HttpClient.bearerToken),
  )
    .then(function (response) {
      console.log('desde signUp', JSON.stringify(response.data));
      HttpClient.bearerToken = response.data.access_token;
      console.log('tokk signUP', HttpClient.bearerToken);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });

  if (registerResponse === undefined)
    return Promise.reject(new Error('preSignUp:register/create'));

  const {data} = registerResponse;
  //console.log('this is the data', response)

  return data;
}

/**
 * Main Login.
 * @param user
 */
async function login(user: AuthDataInterface): Promise<any> {
  //console.log(JSON.stringify(user));
  const tokenResponse = axios(setAxiosConfig(user, 'login'))
    .then(function (response) {
      console.log('desde login', JSON.stringify(response.data));
      HttpClient.bearerToken = response.data.access_token;
      console.log('tokk', HttpClient.bearerToken);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  console.log('RESPONSE ', JSON.stringify(tokenResponse, null, 3));

  return tokenResponse;
}
async function preLogin(user: AuthDataInterface): Promise<any> {
  //console.log(JSON.stringify(user));
  const tokenResponse = axios(setAxiosConfig(user, 'signup'))
    .then(function (response) {
      console.log('desde login', JSON.stringify(response.data));
      HttpClient.bearerToken = response.data.access_token;
      console.log('tokk', HttpClient.bearerToken);
      return response;
    })
    .then(function (res) {
      console.log('response data ', res.data.access_token);
      let authToken = createAccount(user, res.data.access_token);
      console.log('creacion de usuario exitosa');
      return authToken;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  console.log('RESPONSE ', JSON.stringify(tokenResponse.data, null, 3));

  return tokenResponse;
}
//estoy aqui
async function createAccount(
  user: AuthDataInterface,
  authToken: string,
): Promise<any> {
  //console.log(JSON.stringify(user));
  const registerResponse = axios(setAxiosConfigAuthServices(user, authToken))
    .then(function (response) {
      console.log('desde signUp', JSON.stringify(response.data));
      HttpClient.bearerToken = response.data.access_token;
      console.log('tokk CreatedUser', authToken);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  return registerResponse;
}

const setAxiosConfigAuthServices = (
  user: AuthDataInterface,
  authToken: string,
) => {
  console.log('token desde axios ', authToken);
  const config = {
    method: 'post',
    url: 'https://aurumcore.cospace.cloud:9095/t/liverpool.com/onboarding/1.0.0/register/create',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    data: buildNewUserStructure(user),
  };
  console.log('Successfully configured axios for singup!');
  return config;
};

const buildNewUserStructure = (user: AuthDataInterface) => {
  let pass_encript = cryptoAESauth(user.password);
  console.log('pwd ncripted', pass_encript);
  let data = JSON.stringify({
    branchId: '88b12c4a-cc6b-457e-9341-e4808ed6ea06',
    email: `${user.email}`,
    password: `${pass_encript}`,
    personType: '1',
    termsAndConditionsId: '61957402ea01ff5337e9af11',
  });
  return data;
};
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

const setAxiosConfig = (user: AuthDataInterface, signupSettings: string) => {
  const config = {
    method: 'post',
    url: 'https://aurumcore-auth.cospace.cloud/tenant/liverpool.com/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic bEpiOG5xR09GdkFYd3dMRW00Y2d2Y0E5T3lRYTpXc1ljeUxOazVKRnVidlhNRlBPRTZYR25ySklh',
    },
    data: buildDataStructure(user, signupSettings),
  };
  console.log('Successfully configured axios!');
  return config;
};

const buildDataStructure = (
  user: AuthDataInterface,
  signupSettings: string,
) => {
  let grantTypeConfig = 'client_credentials';
  if (signupSettings === 'login') {
    grantTypeConfig = 'password';
  } else {
    grantTypeConfig = 'client_credentials';
  }
  if (user.password && user.email) {
    let pass_encript = cryptoAES(user.password, SECRET, user.email);
    const userData = qs.stringify({
      grant_type: `${grantTypeConfig}`,
      password: `${pass_encript}`,
      scope:
        'use_otp update_info_scope use_accounts use_payments use_profile use_cards',
      username: `${user.email}@liverpool.com`,
      longitude: '90',
      latitude: '90',
    });
    console.log('datos enviados', userData);
    console.log('The data structure was created successfully!');
    return userData;
  } else {
    console.log('Incomplete information in order to login!');
    return null;
  }
};

export const authServices = {
  login,
  otpValidate,
  preSignUp,
  updateInfo,
  sendOtp,
  preLogin,
  createAccount,
};
