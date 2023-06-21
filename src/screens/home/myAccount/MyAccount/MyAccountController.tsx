import React, {useEffect, useRef} from 'react';
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

const MyAccountController: React.FC = () => {
  const {goBack, navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const alert = useAlert();

  const {t} = useTranslation();

  const {
    transactions,
    getTransactions,
    getBalance,
    balance,
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

  useEffect(() => {
    getBalance();
    getTransactions();
  }, []);

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
