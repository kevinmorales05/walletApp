import { ApiAurum } from '../http/api-aurum';
import { AccountInterface } from '../reactRedux';

export type BalanceResponseType = {
  accountId: string;
  amount: {
    amount: string;
    currency: string;
  };
  type: string;
  dateTime: string;
  creditLine: string
};

async function getBalance(): Promise<BalanceResponseType> {
  const response = await ApiAurum.getInstance().getRequest('/accounts/1.0.0/balances', {});

  if (response?.data?.responseMessage === 'Proceso completo y exitoso.') {
    const data = response?.data?.data?.[0];

    return {
      accountId: data?.accountId || '',
      amount: {
        amount: data?.amount?.amount || '0.00',
        currency: data?.amount?.currency || 'MXN'
      },
      type: data?.type || 'ACCOUNT',
      dateTime: data?.dateTime || '',
      creditLine: data?.creditLine || ''
    };
  }

  throw new Error('Some Wrong');
}

async function getTransactions(): Promise<any> {
  const response = await ApiAurum.getInstance().getRequest('/accounts/1.0.0/transactions', {});

  if (response === undefined) return Promise.reject(new Error('getTransactions:/accounts/1.0.0/transactions'));

  return response;
}

/**
 * Function to get user accounts.
 */
async function getAccounts(): Promise<AccountInterface> {
  const response = await ApiAurum.getInstance().getRequest('/accounts/1.0.0/accounts');

  if (response === undefined) return Promise.reject(new Error('getAccounts:/accounts/1.0.0/accounts'));
  return response.data.data[0];
}

export const accountServices = {
  getBalance,
  getTransactions,
  getAccounts
};
