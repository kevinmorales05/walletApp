import {
  SET_ACCOUNT,
  AccountActionTypes,
  AccountsInterface,
} from '../../reactRedux/types';
import {accountServices, BalanceResponseType} from '../../services';
import {CallbackType} from '../../utils';

export function getBalance(callback: CallbackType<BalanceResponseType>) {
  return async () => {
    try {
      const balance = await accountServices.getBalance();

      callback(true, balance);
    } catch (error: any) {
      console.warn(error);
      callback(false);
    }
  };
}

export function getAccountsAction(
  token: string,
  urlToReach: string,
  callback: CallbackType<any>,
) {
  return async () => {
    try {
      const response = await accountServices.getAccounts(token, urlToReach);
      callback(true, response);
    } catch (error: any) {
      callback(false, error);
    }
  };
}

export const setAccountAction = (
  data: AccountsInterface,
): AccountActionTypes => ({
  type: SET_ACCOUNT,
  payload: data,
});
