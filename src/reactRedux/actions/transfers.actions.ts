import {CallbackType} from 'utils';
import {DomesticPaymentResponseType, transfersServices} from '../../services';

export function sendMoney(
  accountId: string,
  consentID: string,
  amount: string,
  identification: string,
  name: string,
  authToken: string,
  callback: CallbackType<DomesticPaymentResponseType>,
) {
  return async () => {
    try {
      const user = {
        accountId: accountId,
        consentID: consentID,
      };
      const userToSend = {
        identification: identification,
        name: name,
      };
      const response = await transfersServices.sendMoney(
        user,
        userToSend,
        authToken,
        amount,
      );

      callback(true, response);
    } catch (error: any) {
      console.warn(error);
      callback(false);
    }
  };
}
