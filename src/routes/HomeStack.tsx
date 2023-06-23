import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParams} from '../utils';
import HomeController from '../screens/home/Home/HomeController';
import MyAccountController from '../screens/home/myAccount/MyAccount/MyAccountController';
import SendMoneyController from '../screens/home/sendMoney/SendMoney/SendMoneyController';
import SearchAddresseeController from '../screens/home/sendMoney/SearchAddressee/SearchAddresseeController';
import NewAddresseeController from '../screens/home/sendMoney/NewAddressee/NewAddresseeController';
import MovementDetailsController from '../screens/home/myAccount/MovementDetails/MovementDetailsController';
import QrAmountController from '../screens/home/qrCollect/QrAmount/QrAmountController';
import QrCodeController from '../screens/home/qrCollect/QrCode/QrCodeController';
import QrReaderController from '../screens/home/qrPay/QrReader/QrReaderController';
import MakePaymentController from '../screens/home/qrPay/MakePayment/MakePaymentController';
import SuccessPaymentController from '../screens/home/qrPay/SuccessPayment/SuccessPaymentController';

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeController} />
    <Stack.Screen name="MyAccount" component={MyAccountController} />
    <Stack.Screen
      name="MovementDetails"
      component={MovementDetailsController}
    />
    <Stack.Screen name="SendMoney" component={SendMoneyController} />
    <Stack.Screen
      name="SearchAddressee"
      component={SearchAddresseeController}
    />
    <Stack.Screen name="NewAddressee" component={NewAddresseeController} />
    <Stack.Screen name="QrAmount" component={QrAmountController} />
    <Stack.Screen name="QrCode" component={QrCodeController} />
    <Stack.Screen name="QrReader" component={QrReaderController} />
    <Stack.Screen name="MakePayment" component={MakePaymentController} />
    <Stack.Screen name="SuccessPayment" component={SuccessPaymentController} />
  </Stack.Navigator>
);

export default HomeStack;
