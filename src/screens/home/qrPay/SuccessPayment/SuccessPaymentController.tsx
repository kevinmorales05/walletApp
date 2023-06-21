import React from 'react';
import {SafeArea} from '../../../../components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../../../utils';
import SuccessPaymentScreen from './SuccessPaymentScreen';

const MakePaymentController: React.FC = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <SafeArea barStyle="dark">
      <SuccessPaymentScreen onPressPay={() => navigate('Home')} />
    </SafeArea>
  );
};

export default MakePaymentController;
