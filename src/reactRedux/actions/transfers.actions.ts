import { CallbackType } from 'utils';
import { DomesticPaymentResponseType, transfersServices } from 'services';

export function sendMoney(
  accountId: string,
  amount: string,
  identification: string,
  callback: CallbackType<DomesticPaymentResponseType>
) {
  return async () => {
    try {
      const response = await transfersServices.sendMoney(accountId, amount, identification);

      callback(true, response);
    } catch (error: any) {
      console.warn(error);
      callback(false);
    }
  };
}
