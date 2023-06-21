import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeArea} from '../../../../components';
import React from 'react';
import Theme from '../../../../theme';
import {HomeStackParams} from '../../../../utils';
import NewAddresseeScreen from './NewAddresseeScreen';

const NewAddresseeController: React.FC = () => {
  const {goBack, navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const {
    params: {account},
  } = useRoute<RouteProp<HomeStackParams, 'NewAddressee'>>();

  return (
    <SafeArea
      backgroundColor={Theme.Colors.UltralightGrey}
      topBGColor={Theme.Colors.Bright}
      barStyle="dark">
      <NewAddresseeScreen
        account={account}
        onPressBack={goBack}
        onSubmit={(name, aka, save) => {
          console.log({name, aka, save});
          navigate('SendMoney');
        }}
      />
    </SafeArea>
  );
};

export default NewAddresseeController;
