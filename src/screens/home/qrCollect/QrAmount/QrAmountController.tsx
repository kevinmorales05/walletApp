import React, {useEffect} from 'react';
import {useAlert} from '../../../../context';
import {SafeArea} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../../../utils';
import QrAmountScreen from './QrAmountScreen';

const QrAmountController: React.FC = () => {
  const {goBack, navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const alert = useAlert();

  const {t} = useTranslation();

  const onPressUnavailableItem = () => {
    alert.show({
      title: t('global:sorry'),
      message: t('global:functionalityNotAvailable'),
    });
  };

  const onSubmit = (amount: number) => {
    navigate('QrCode', {amount});
  };

  useEffect(() => {
    // getBalance();
    // getTransactions();
  }, []);

  return (
    <SafeArea barStyle="dark">
      <QrAmountScreen
        onPressBack={goBack}
        onPressUnavailableItem={onPressUnavailableItem}
        onSubmit={onSubmit}
      />
    </SafeArea>
  );
};

export default QrAmountController;
