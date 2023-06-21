import React from 'react';
import {SafeArea} from '../../../../components';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../../../utils';
import MovementDetailsScreen from './MovementDetailsScreen';

const MovementDetailsController: React.FC = () => {
  const {goBack} = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const {
    params: {movement},
  } = useRoute<RouteProp<HomeStackParams, 'MovementDetails'>>();

  return (
    <SafeArea barStyle="dark">
      <MovementDetailsScreen movement={movement} onPressBack={goBack} />
    </SafeArea>
  );
};

export default MovementDetailsController;
