import axios from 'axios';
import {ApiAurum} from '../http/api-aurum';
import {AccountsInterface} from '../reactRedux';
import cryptoAESauth from '../utils/cryptpAESauth';
import {cryptoSignature} from '../utils/cryptoSignature';

export type BalanceResponseType = {
  accountId: string;
  amount: {
    amount: string;
    currency: string;
  };
  type: string;
  dateTime: string;
  creditLine: string;
};
//not using
async function getBalance(): Promise<BalanceResponseType> {
  const response = await ApiAurum.getInstance().getRequest(
    '/accounts/1.0.0/balances',
    {},
  );

  if (response?.data?.responseMessage === 'Proceso completo y exitoso.') {
    const data = response?.data?.data?.[0];

    return {
      accountId: data?.accountId || '',
      amount: {
        amount: data?.amount?.amount || '0.00',
        currency: data?.amount?.currency || 'MXN',
      },
      type: data?.type || 'ACCOUNT',
      dateTime: data?.dateTime || '',
      creditLine: data?.creditLine || '',
    };
  }

  throw new Error('Some Wrong');
}

async function getAccounts(token: string, urlToReach: string): Promise<any> {
  const response = axios(setAxiosConfigAuthServices(token, urlToReach))
    .then(function (res) {
      console.log('Data from accounts ', JSON.stringify(res.data));
      return res;
    })
    .catch(function (error) {
      console.log('Error ', error);
      return error;
    });
  return response;
}
async function getTransactions(
  token: string,
  urlToReach: string,
): Promise<AccountsInterface> {
  // const response = await ApiAurum.getInstance().getRequest(
  //   '/accounts/1.0.0/accounts',
  // );

  const response = axios(setAxiosConfigAuthServices(token, urlToReach));
  if (response === undefined)
    return Promise.reject(
      new Error('getAccounts:/accounts/1.0.0/transactions'),
    );
  console.log('data from accounts ', response);
  return response.data.data[0];
}

const setAxiosConfigAuthServices = (authToken: string, urlToReach: string) => {
  let urlService = '';
  if (urlToReach === 'accounts') {
    urlService =
      'https://aurumcore.cospace.cloud:9095/t/liverpool.com/accounts/1.0.0/accounts';
  } else if (urlToReach === 'transactions') {
    urlService =
      'https://aurumcore.cospace.cloud:9095/t/liverpool.com/accounts/1.0.0/transactions';
  } else if (urlToReach === 'balances') {
    urlService =
      'https://aurumcore.cospace.cloud:9095/t/liverpool.com/accounts/1.0.0/balances';
  }

  console.log('token desde axios accounts ', authToken);
  const config = {
    method: 'get',
    url: urlService,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      'x-signature': cryptoSignature(authToken, urlService),
    },
  };
  console.log('Successfully configured axios for auth endpoints!');
  return config;
};

export const accountServices = {
  getBalance,
  getTransactions,
  getAccounts,
};
