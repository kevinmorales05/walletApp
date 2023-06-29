import axios from 'axios';
import qs from 'qs';
import {AuthDataInterface} from './types';
import cryptoAES from '../utils/cryptoAES';
import {HttpClient} from '../http/http-client';
const SECRET = 'l1v3rp00l';

const buildDataStructure = (
  user: AuthDataInterface,
  signupSettings: string,
) => {
  let grantTypeConfig = 'client_credentials';
  if (signupSettings === 'login') {
    grantTypeConfig = 'password';
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
const setAxiosConfigAuthServices = (
  user: AuthDataInterface,
  authToken: string,
) => {
  const config = {
    method: 'post',
    url: 'https://aurumcore.cospace.cloud:9095/t/liverpool.com/onboarding/1.0.0/register/create',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    data: buildNewUserStructure(user),
  };
  console.log('Successfully configured axios!');
  return config;
};
const buildNewUserStructure = (user: AuthDataInterface) => {
  let pass_encript = cryptoAES(user.password, SECRET, user.email);
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
export async function loginWithAurum(
  user: AuthDataInterface,
  signupSettings: string,
): Promise<any> {
  axios(setAxiosConfig(user, signupSettings))
    .then(function (response) {
      console.log('desde login', JSON.stringify(response.data));
      HttpClient.bearerToken = response.data.access_token;
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

export async function createNewAccount(user: AuthDataInterface): Promise<any> {
  console.log('start sign up!');
  let token = '';
  axios(setAxiosConfig(user, 'signup'))
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      console.log('TOKEN ', response.data.access_token);
      try {
        const tokenResponse = axios(
          setAxiosConfigAuthServices(user, response.data.access_token),
        )
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            HttpClient.bearerToken = response.data.access_token;
            return response.data;
          })
          .catch(function (error) {
            console.log('error in signup',error);
            return error;
          });
        console.log('PreLogin', JSON.stringify(tokenResponse));
      } catch (error) {
        console.log('error create user ', error);
      }
      HttpClient.bearerToken = response.data.access_token;
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}
