import {
  AccountInterface,
  SET_ACCOUNT,
  AccountActionTypes,
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

export function getAccountsAction(callback: CallbackType<AccountInterface>) {
  return async () => {
    try {
      const response = await accountServices.getAccounts();
      callback(true, response);
    } catch (error: any) {
      callback(false, error);
    }
  };
}

export const setAccountAction = (
  data: AccountInterface,
): AccountActionTypes => ({
  type: SET_ACCOUNT,
  payload: data,
});
