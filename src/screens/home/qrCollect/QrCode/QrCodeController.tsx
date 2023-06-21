import React, {useEffect} from 'react';
import {SafeArea} from '../../../../components';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../../../utils';
import Theme from '../../../../theme';
import {RootState} from '../../../../reactRedux';
import {useSelector} from 'react-redux';
import QrCodeScreen from './QrCodeScreen';

const QrCodeController: React.FC = () => {
  const {goBack} = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const {
    params: {amount},
  } = useRoute<RouteProp<HomeStackParams, 'QrCode'>>();
  const userAccount = useSelector((state: RootState) => state.account);

  useEffect(() => {
    console.log(
      'THE USER ACCOUNT IS ======> ',
      JSON.stringify(userAccount, null, 3),
    );
  }, []);

  return (
    <SafeArea backgroundColor={Theme.Colors.UltralightGrey} barStyle="dark">
      <QrCodeScreen amount={amount} onPressBack={goBack} />
    </SafeArea>
  );
};

export default QrCodeController;
