import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import languageEs from './translations/es.json';
import onboardingEs from '../screens/auth/Onboarding/i18n/es.json';
import sendMoneyEs from '../screens/home/sendMoney/SendMoney/i18n/es.json';
import searchAddresseeEs from '../screens/home/sendMoney/SearchAddressee/i18n/es.json';
import newAddresseeEs from '../screens/home/sendMoney/NewAddressee/i18n/es.json';
import homeEs from '../screens/home/Home/i18n/es.json';
import myAccountEs from '../screens/home/myAccount/MyAccount/i18n/es.json';
import movementDetailsEs from '../screens/home/myAccount/MovementDetails/i18n/es.json';
import loginUserEs from '../screens/auth/LoginUser/i18n/es.json';
import loginEs from '../screens/auth/Login/i18n/es.json';
import httpErrorsEs from '../http/i18n/es.json';
import qrAmountEs from '../screens/home/qrCollect/QrAmount/i18n/es.json';
import qrCodeEs from '../screens/home/qrCollect/QrCode/i18n/es.json';
import underConstructionEs from '../screens/home/UnderConstruction/i18n/es.json';
import makePaymentEs from '../screens/home/qrPay/MakePayment/i18n/es.json';
import successPaymentEs from '../screens/home/qrPay/SuccessPayment/i18n/es.json';

import languageEn from './translations/en.json';
import onboardingEn from '../screens/auth/Onboarding/i18n/en.json';
import sendMoneyEn from '../screens/home/sendMoney/SendMoney/i18n/en.json';
import searchAddresseeEn from '../screens/home/sendMoney/SearchAddressee/i18n/en.json';
import newAddresseeEn from '../screens/home/sendMoney/NewAddressee/i18n/en.json';
import homeEn from '../screens/home/Home/i18n/en.json';
import myAccountEn from '../screens/home/myAccount/MyAccount/i18n/en.json';
import movementDetailsEn from '../screens/home/myAccount/MovementDetails/i18n/en.json';
import loginUserEn from '../screens/auth/LoginUser/i18n/en.json';
import loginEn from '../screens/auth/Login/i18n/en.json';
import httpErrorsEn from '../http/i18n/en.json';
import qrAmountEn from '../screens/home/qrCollect/QrAmount/i18n/en.json';
import qrCodeEn from '../screens/home/qrCollect/QrCode/i18n/en.json';
import underConstructionEn from '../screens/home/UnderConstruction/i18n/en.json';
import makePaymentEn from '../screens/home/qrPay/MakePayment/i18n/en.json';
import successPaymentEn from '../screens/home/qrPay/SuccessPayment/i18n/en.json';

const localize = getLocales()[0].languageCode;

const resources: Resource = {
  es: {
    ...languageEs,
    ...onboardingEs,
    ...sendMoneyEs,
    ...searchAddresseeEs,
    ...newAddresseeEs,
    ...homeEs,
    ...myAccountEs,
    ...movementDetailsEs,
    ...loginUserEs,
    ...loginEs,
    ...httpErrorsEs,
    ...qrAmountEs,
    ...qrCodeEs,
    ...underConstructionEs,
    ...makePaymentEs,
    ...successPaymentEs
  },
  en: {
    ...languageEn,
    ...onboardingEn,
    ...sendMoneyEn,
    ...searchAddresseeEn,
    ...newAddresseeEn,
    ...homeEn,
    ...myAccountEn,
    ...movementDetailsEn,
    ...loginUserEn,
    ...loginEn,
    ...httpErrorsEn,
    ...qrAmountEn,
    ...qrCodeEn,
    ...underConstructionEn,
    ...makePaymentEn,
    ...successPaymentEn
  }
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: localize,
  fallbackLng: 'es',
  resources
});

export default i18n;
