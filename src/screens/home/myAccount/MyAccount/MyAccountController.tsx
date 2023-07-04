import React, {useEffect, useRef, useState} from 'react';
import {useAccount} from '../../../../hooks/use-account';
import {useAlert} from '../../../../context';
import {SafeArea} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import BottomSheet from '@gorhom/bottom-sheet';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../../../utils';
import {MovementsSheet} from '../../../../components/organisms/MovementsSheet';
import MyAccountScreen from './MyAccountScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  RootState,
  getAccountsAction,
  setAccountAction,
} from '../../../../reactRedux';

const MyAccountController: React.FC = () => {
  const {isLogged, authToken} = useSelector((state: RootState) => state.auth);
  const [balance, setBalance] = useState(); // get account information
  const account = useSelector((state: RootState) => state.account);
  console.log('ACCOunt this wallet', account);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAccountsAction(authToken, 'balances', (success, data) => {
        console.log('success ', success);
        console.log('data balances ', data.data);
        const accountsArray = suitableBalance(data.data.data);
        setBalance(accountsArray[0]);
      }),
    );
  }, []);

  const {goBack, navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const alert = useAlert();

  const {t} = useTranslation();

  const {
    transactions,
    getTransactions,
    getBalance,
    fetchingBalance,
    fetchingTransactions,
  } = useAccount();

  const sheetRef = useRef<BottomSheet>(null);

  const onPressUnavailableItem = () => {
    alert.show({
      title: t('global:sorry'),
      message: t('global:functionalityNotAvailable'),
    });
  };

 

  const suitableBalance = array => {
    let balanceObj = array.filter(element => element.amount.amount > 0);
    console.log('first', balanceObj);
    return balanceObj;
  };

  useEffect(() => {
    if (!fetchingTransactions && transactions.length > 0) {
      sheetRef.current?.collapse();
    }
  }, [fetchingTransactions, transactions]);
  

  return (
    <SafeArea barStyle="dark">
      <MyAccountScreen
        onPressBack={goBack}
        onPressUnavailableItem={onPressUnavailableItem}
        balance={balance}
        fetchingBalance={fetchingBalance}
      />
      <MovementsSheet
        ref={sheetRef}
        transactions={transactions}
        onPressMovement={movement => navigate('MovementDetails', {movement})}
      />
    </SafeArea>
  );
};

export default MyAccountController;
