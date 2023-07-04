import {ApiAurum} from '../http/api-aurum';
import axios from 'axios';
import {cryptoSignature} from '../utils/cryptoSignature';

export type DomesticPaymentResponseType = {
  responseCode: string;
  responseMessage: string;
  responseSubject: string;
  messageType: string;
  transId: string;
  paymentId: string;
  authorizationCode: string;
  accountholderId: string;
};

// async function sendMoney(
//   accountId: string,
//   amount: string,
//   identification: string,
// ): Promise<DomesticPaymentResponseType> {
//   const response = await ApiAurum.getInstance().postRequest(
//     'payments/1.0.0/domestic-payments',
//     {
//       accountId,
//       consentId: '1234',
//       initiation: {
//         instructionIdentification: '',
//         localInstrument: '',
//         endToEndIdentification: '',
//         instructecAmount: {
//           amount,
//           currency: 'MXN',
//         },
//         debtorAccount: {
//           schemeName: '',
//           identification,
//           name: '',
//           secondaryIdentification: '',
//         },
//         creditorAccount: {
//           schemeName: '',
//           identification: '',
//           name: '',
//           secondaryIdentification: '',
//         },
//         creditorPostalAddress: {
//           addressType: 'Business',
//           department: '',
//           subDeparment: '',
//           streeName: '',
//           buildingNumber: '',
//           postCode: '',
//           townName: '',
//           countrySubDivisión: '',
//           country: '',
//           addressLine: '',
//         },
//         remittanceInformation: {
//           reference: '1',
//           unstructured: '',
//         },
//       },
//       risk: {
//         paymentContextCode: 'concept',
//         merchantCategoryCode: '',
//         merchantCustomerIdentification: '',
//         deliveryAddress: {
//           addressLine: [''],
//           streetName: '',
//           buildingNumber: '',
//           postCode: '',
//           townName: '',
//           countySubDivision: [''],
//           country: '',
//         },
//       },
//     },
//   );

//   if (response?.data?.responseMessage === 'Proceso completo y exitoso.') {
//     const data = response?.data;

//     return {
//       responseCode: data?.responseCode,
//       responseMessage: data?.responseMessage,
//       responseSubject: data?.responseSubject,
//       messageType: data?.messageType,
//       transId: data?.transId,
//       paymentId: data?.data.paymentId,
//       authorizationCode: data?.data.authorizationCode,
//       accountholderId: data?.accountholderId,
//     };
//   }

//   throw new Error('Some Wrong');
// }
async function sendMoney(
  user: any,
  userToSend: any,
  authToken: string,
  amount: string,
): Promise<DomesticPaymentResponseType> {
  const urlToReach =
    'https://aurumcore.cospace.cloud:9095/t/liverpool.com/payments/1.0.0/domestic-payment';
  const response = axios(
    configTransferService(authToken, urlToReach, userToSend, user, amount),
  );

  if (response?.data?.responseMessage === 'Proceso completo y exitoso.') {
    const data = response?.data;

    return {
      responseCode: data?.responseCode,
      responseMessage: data?.responseMessage,
      responseSubject: data?.responseSubject,
      messageType: data?.messageType,
      transId: data?.transId,
      paymentId: data?.data.paymentId,
      authorizationCode: data?.data.authorizationCode,
      accountholderId: data?.accountholderId,
    };
  }

  throw new Error('Some Wrong');
}

//url to reach is
// https://aurumcore.cospace.cloud:9095/t/liverpool.com/payments/1.0.0/domestic-payment

let configTransferService = (
  authToken: string,
  urlToReach: string,
  userToSend: any,
  user: any,
  amount: string,
) => {
  let paymentConfig = {
    method: 'post',
    url: urlToReach,
    headers: {
      'Content-Type': 'application/json',
      'x-signature': cryptoSignature(authToken, urlToReach),
      Authorization: `Bearer ${authToken}`,
    },
    data: dataSender(userToSend, amount, user),
  };
  return paymentConfig;
};

/*
UserToSend
in the reciver account it is required to use:
identificationid and name, amount.
For the sender it is required to use:
accountID, consentID

*/

let dataSender = (userToSend: any, amount: string, user: any) => {
  JSON.stringify({
    accountId: user.accountId,
    consentId: user.consentId,
    initiation: {
      instructionIdentification: '',
      localInstrument: '',
      endToEndIdentification: '',
      instructecAmount: {
        amount: amount,
        currency: 'MXN',
      },
      debtorAccount: {
        schemeName: '',
        identification: '',
        name: '',
        secondaryIdentification: '',
      },
      creditorAccount: {
        schemeName: '',
        identification: userToSend.identification,
        name: userToSend.name,
        secondaryIdentification: '',
      },
      creditorPostalAddress: {
        addressType: 'Business',
        department: '',
        subDeparment: '',
        streeName: '',
        buildingNumber: '',
        postCode: '',
        townName: '',
        countrySubDivisión: '',
        country: '',
        addressLine: '',
      },
      remittanceInformation: {
        reference: '1234567',
        unstructured: '',
      },
    },
    risk: {
      paymentContextCode: 'BillPayment',
      merchantCategoryCode: '',
      merchantCustomerIdentification: '',
      deliveryAddress: {
        addressLine: [''],
        streetName: '',
        buildingNumber: '',
        postCode: '',
        townName: '',
        countySubDivision: [''],
        country: '',
      },
    },
  });
};
export const transfersServices = {
  sendMoney,
};
