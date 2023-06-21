import React, {useEffect} from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeArea} from '../../../components';
import Theme from '../../../theme';
import {HomeStackParams} from '../../../utils';
import {getAccountsAction, setAccountAction} from '../../../reactRedux';
import {useDispatch} from 'react-redux';
import HomeScreen from './HomeScreen';

const HomeController: React.FC = () => {
  const {dispatch: dispatchDrawer, navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAccountsAction((success, data) => {
        if (success && data) dispatch(setAccountAction(data));
      }),
    );
  }, []);

  return (
    <SafeArea
      backgroundColor={Theme.Colors.UltralightGrey}
      bottomBGColor={Theme.Colors.Bright}
      topBGColor={Theme.Colors.Bright}
      barStyle="dark">
      <HomeScreen
        onPressMenu={() => dispatchDrawer(DrawerActions.openDrawer())}
        onPressSend={() => navigate('SendMoney')}
        onPressMyAccount={() => navigate('MyAccount')}
        onPressQrAmount={() => navigate('QrAmount')}
        onPressQrPay={() => navigate('QrReader')}
        onPressMakePayment={() => navigate('MakePayment')}
      />
    </SafeArea>
  );
};

export default HomeController;
