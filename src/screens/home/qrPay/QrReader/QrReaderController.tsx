import {SafeArea} from '../../../../components';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CodePayment, HomeStackParams} from '../../../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../reactRedux';
import {Barcode, BarcodeFormat} from 'vision-camera-code-scanner';
import QrReaderScreen from './QrReaderScreen';

const QrReaderController: React.FC = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const userAccount = useSelector((state: RootState) => state.account);
  const accountId = userAccount.data[0].accountId;

  const onSubmit = (code: Barcode) => {
    // Only codes generated from the app are valid
    if (
      code.format !== Number(BarcodeFormat.CODE_128) &&
      code.format !== Number(BarcodeFormat.QR_CODE)
    ) {
      navigate('Home');
      return;
    }
    const amount: any = code.displayValue?.split('|')[0];
    const identification: any = code.displayValue?.split('|')[1];
    const name: any = code.displayValue?.split('|')[2];

    const payment: CodePayment = {accountId, amount, identification, name};
    navigate('MakePayment', payment);
  };

  return (
    <SafeArea barStyle="dark">
      <QrReaderScreen onPressQROk={onSubmit} />
    </SafeArea>
  );
};

export default QrReaderController;
