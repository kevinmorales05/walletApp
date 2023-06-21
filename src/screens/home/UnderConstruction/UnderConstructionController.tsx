import React from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeArea} from '../../../components';
import Theme from '../../../theme';
import {HomeStackParams} from '../../../utils';
import UnderConstructionScreen from './UnderConstructionScreen';

const UnderConstructionController: React.FC = () => {
  const {dispatch, navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <SafeArea
      backgroundColor={Theme.Colors.UltralightGrey}
      bottomBGColor={Theme.Colors.Bright}
      topBGColor={Theme.Colors.Bright}>
      <UnderConstructionScreen
        onPressMenu={() => dispatch(DrawerActions.openDrawer())}
        onPressHome={() => navigate('Home')}
      />
    </SafeArea>
  );
};

export default UnderConstructionController;
