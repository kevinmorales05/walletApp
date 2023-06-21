import {SafeArea} from '../../../components/atoms';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {useAlert} from '../../../context';
import {LanguageModal} from '../../../components';
import i18n from '../../../i18n';
import {
  RootState,
  setEmailAction,
  setInitialState,
  setLanguage,
} from '../../../reactRedux';
import LoginUserScreen from '../LoginUser/LoginUserScreen';

const LoginUserController: React.FC = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<NativeStackNavigationProp<any>>();
  const alert = useAlert();
  const userAuth = useSelector((state: RootState) => state.auth);
  const {language} = useSelector((state: RootState) => state.app);

  const {t} = useTranslation();

  const [languageModalVisible, setLanguageModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    console.log(
      'THE USER STATE IS ======> ',
      JSON.stringify(userAuth, null, 3),
    );

    if (language) {
      i18n.changeLanguage(language);
    } else {
      setLanguageModalVisible(true);
    }
  }, []);

  const {goBack} = useNavigation();

  const resetUsername = () => {
    alert.show({
      title: t('global:sorry'),
      message: t('global:functionalityNotAvailable'),
    });
  };

  const goToLogin = (username: string) => {
    dispatch(setEmailAction(username));
    navigate('Login');
  };

  const goToOnboarding = () => {
    dispatch(setInitialState());
    navigate('Onboarding');
  };

  const onContinueLanguage = () => {
    setLanguageModalVisible(false);
    dispatch(setLanguage(t('language:tag')));
  };

  const onSwitchLanguage = () => {
    setLanguageModalVisible(false);

    const switchLanguage = t('language:tag') === 'es' ? 'en' : 'es';
    dispatch(setLanguage(switchLanguage));
    i18n.changeLanguage(switchLanguage);
  };

  return (
    <SafeArea>
      <LoginUserScreen
        onPressBack={goBack}
        onPressSubmit={goToLogin}
        onPressForgotUsername={resetUsername}
        onOnboarding={goToOnboarding}
      />
      <LanguageModal
        visible={languageModalVisible}
        onContinue={onContinueLanguage}
        onSwitch={onSwitchLanguage}
      />
    </SafeArea>
  );
};

export default LoginUserController;
