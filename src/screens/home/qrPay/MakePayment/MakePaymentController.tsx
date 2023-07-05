import React, {useState} from 'react';
import {useAlert} from '../../../../context';
import {NipModal, SafeArea} from '../../../../components';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../../../utils';
import {useDispatch} from 'react-redux';
import {sendMoney} from '../../../../reactRedux';
import MakePaymentScreen from './MakePaymentScreen';

const MakePaymentController: React.FC = () => {
  const {goBack} = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const alert = useAlert();
  const [nipModalVisible, setNipModalVisible] = useState<boolean>(false);
  const {t} = useTranslation();
  const {navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const {params: CodePayment} =
    useRoute<RouteProp<HomeStackParams, 'MakePayment'>>();
  const dispatch = useDispatch();

  const onPressUnavailableItem = () => {
    alert.show({
      title: t('global:sorry'),
      message: t('global:functionalityNotAvailable'),
    });
  };
  const submit = (nip: string) => {
    setNipModalVisible(false);
//aqui esta para enviar el dinero
console.log("pagos datos ", CodePayment);
    dispatch(
      sendMoney(
        CodePayment.accountId!,
        CodePayment.amount,
        CodePayment.identification,
        (success, data) => {
          if (success && data) {
            navigate('SuccessPayment', CodePayment);
          } else {
            alert.show({
              title: t('sendMoneyAlert:someWrong'),
              message: t('sendMoneyAlert:someWrongMsg'),
            });
            navigate('Home');
          }
        },
      ),
    );
  };

  const goHome = () => {
    goBack();
    navigate('Home');
  };

  return (
    <SafeArea barStyle="dark">
      <MakePaymentScreen
        codePayment={CodePayment}
        onPressCancel={goHome}
        onPressBack={goHome}
        onPressUnavailableItem={onPressUnavailableItem}
        onPressPay={() => setNipModalVisible(true)}
      />
      <NipModal
        visible={nipModalVisible}
        onSubmit={submit}
        onCancel={() => setNipModalVisible(false)}
      />
    </SafeArea>
  );
};

export default MakePaymentController;
