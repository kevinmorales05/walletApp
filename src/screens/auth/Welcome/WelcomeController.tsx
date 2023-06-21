import {SafeArea} from '../../../components/atoms';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {AuthStackParams} from '../../../utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';

const WelcomeController: React.FC = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  return (
    <SafeArea>
      <WelcomeScreen onPressedFinish={() => navigate('Login')} />
    </SafeArea>
  );
};

export default WelcomeController;
