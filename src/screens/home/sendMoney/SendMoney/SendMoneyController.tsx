import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import PagerView from 'react-native-pager-view';
import {NipModal, SafeArea} from '../../../../components';
import Theme from '../../../../theme';
import {HomeStackParams} from '../../../../utils';
import {getAccountsAction, getBalance, sendMoney} from '../../../../reactRedux';
import {useAlert} from '../../../../context';
import SendMoneyScreen from './SendMoneyScreen';
import {useDispatch, useSelector} from 'react-redux';


const SendMoneyController: React.FC = () => {
  const dispatch = useDispatch();
  const {navigate} =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const {t} = useTranslation();
  const alert = useAlert();

  const pagerViewRef = useRef<PagerView>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [amount, setAmount] = useState<string>('');
  const [concept, setConcept] = useState<string>('');
  const [nipModalVisible, setNipModalVisible] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>('0.00');
  const {isLogged, authToken} = useSelector((state: RootState) => state.auth);


  const setPage = (index: number) => {
    pagerViewRef.current?.setPage(index);
  };

  const submit = (nip: string) => {
    setNipModalVisible(false);
    dispatch(
      ///me quedo aqui debo configurar el flujo de datos
      sendMoney(amount, nip, concept, (success, data) => {
        if (success && data) {
          alert.show({
            title: t('sendMoneyAlert:successful'),
            message: `transId: ${data.transId}\npaymentId: ${data.paymentId}\nauthorizationCode: ${data.authorizationCode}`,
          });
        } else {
          alert.show({
            title: t('sendMoneyAlert:someWrong'),
            message: t('sendMoneyAlert:someWrongMsg'),
          });
        }

        navigate('Home');
      }),
    );
  };

  useEffect(() => {
    // dispatch(
    //   getBalance((success, data) => {
    //     if (success && data) setBalance(data.amount.amount);
    //   }),
    // );
    dispatch(
      getAccountsAction(authToken, 'balances', (success, data) => {
        if (success && data) console.log('Love!');
        console.log("response Balances ", data.accountholderId)
      }),
    );
  }, []);

  return (
    <SafeArea
      backgroundColor={Theme.Colors.UltralightGrey}
      bottomBGColor={Theme.Colors.Bright}
      barStyle="dark">
      <SendMoneyScreen
        ref={pagerViewRef}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        onPressBack={() => navigate('Home')}
        onPressNewAddressee={() => navigate('SearchAddressee')}
        onSelectAddressee={() => setPage(currentIndex + 1)}
        onSelectAmount={value => {
          setAmount(value);
          setPage(currentIndex + 1);
        }}
        goBack={setPage}
        amount={amount}
        onSelectConcept={value => {
          setConcept(value);
          setNipModalVisible(true);
        }}
        balance={balance}
      />
      <NipModal
        visible={nipModalVisible}
        onSubmit={submit}
        onCancel={() => setNipModalVisible(false)}
      />
    </SafeArea>
  );
};

export default SendMoneyController;
