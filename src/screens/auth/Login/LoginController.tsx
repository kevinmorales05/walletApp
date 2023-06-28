import {SafeArea} from '../../../components/atoms';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {useAlert, useLoading} from '../../../context';
import {loginAction, RootState, setIsLogged} from '../../../reactRedux';
import LoginScreen from './LoginScreen';

const LoginController: React.FC = () => {
  const loader = useLoading();
  const dispatch = useDispatch();
  const alert = useAlert();
  const userAuth = useSelector((state: RootState) => state.auth);

  const {t} = useTranslation();

  useEffect(() => {
    console.log(
      'THE USER STATE IS ======> ',
      JSON.stringify(userAuth, null, 3),
    );
  }, []);

  const {goBack} = useNavigation();

  const resetPassword = () => {
    alert.show({
      title: t('global:sorry'),
      message: t('global:functionalityNotAvailable'),
    });
  };

  /**
   * Main Login
   * @param loginData
   */
  const secureLogin = (loginData: any) => {
    loader.show();
    userAuth.password = loginData?.password;
    dispatch(
      loginAction(userAuth, (success, data) => {
        loader.hide();
        if (success && data) {
          console.log('LOGIN EXITOSO');
          dispatch(setIsLogged(true));
        }
        else {
          console.log('LOGIN EXITOSO');
          dispatch(setIsLogged(true));
        }
      }),
    );
  };

  return (
    <SafeArea>
      <LoginScreen
        onPressForgotPassword={resetPassword}
        onPressBack={goBack}
        secureLogin={secureLogin}
      />
    </SafeArea>
  );
};

export default LoginController;
