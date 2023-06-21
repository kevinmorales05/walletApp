import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeArea} from '../../../../components';
import React from 'react';
import Theme from '../../../../theme';
import {HomeStackParams} from '../../../../utils';
import SearchAddresseeScreen from './SearchAddresseeScreen';

const SearchAddresseeController: React.FC = () => {
  const {goBack, navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  return (
    <SafeArea
      backgroundColor={Theme.Colors.UltralightGrey}
      topBGColor={Theme.Colors.Bright}
      barStyle="dark">
      <SearchAddresseeScreen
        onPressBack={goBack}
        onSubmit={account => navigate('NewAddressee', {account})}
      />
    </SafeArea>
  );
};

export default SearchAddresseeController;
