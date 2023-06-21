import { ApiAurum } from '../http/api-aurum';

export type DomesticPaymentResponseType = {
  responseCode: string;
  responseMessage: string;
  responseSubject: string;
  messageType: string;
  transId: string;
  paymentId: string;
  authorizationCode: string;
  accountholderId: string;
}

async function sendMoney(accountId: string, amount: string, identification: string): Promise<DomesticPaymentResponseType> {
  const response = await ApiAurum.getInstance().postRequest(
    'payments/1.0.0/domestic-payments',
    {
      accountId,
      consentId: '1234',
      initiation: {
        instructionIdentification: '',
        localInstrument: '',
        endToEndIdentification: '',
        instructecAmount: {
          amount,
          currency: 'MXN'
        },
        debtorAccount: {
          schemeName: '',
          identification,
          name: '',
          secondaryIdentification: ''
        },
        creditorAccount: {
          schemeName: '',
          identification: '',
          name: '',
          secondaryIdentification: ''
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
          addressLine: ''
        },
        remittanceInformation: {
          reference: '1',
          unstructured: ''
        }
      },
      risk: {
        paymentContextCode: 'concept',
        merchantCategoryCode: '',
        merchantCustomerIdentification: '',
        deliveryAddress: {
          addressLine: [
            ''
          ],
          streetName: '',
          buildingNumber: '',
          postCode: '',
          townName: '',
          countySubDivision: [
            ''
          ],
          country: ''
        }
      }
    }
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
      accountholderId: data?.accountholderId
    };
  }

  throw new Error('Some Wrong');
}

export const transfersServices = {
  sendMoney
};
