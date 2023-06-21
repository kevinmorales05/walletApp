import {ARROW_LEFT_GRAY_ICON, LOCK_ICON, LOGO} from '../../../assets/images';
import {
  Button,
  Container,
  Input,
  TextContainer,
  Touchable,
  TouchableText,
} from '../../../components';
import React, {useEffect, useRef} from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {Image, ScrollView, StyleSheet, TextInput} from 'react-native';
import Theme from '../../../theme';
import {passwordRule} from '../../../utils/rules';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RootState} from '.././../../reactRedux';

type SecureLoginParams = {username: string; password: string};

interface Props {
  onPressBack: () => void;
  onPressForgotPassword: () => void;
  secureLogin: (params: SecureLoginParams) => void;
}

const LoginScreen: React.FC<Props> = ({
  onPressBack,
  onPressForgotPassword,
  secureLogin,
}) => {
  const userAuth = useSelector((state: RootState) => state.auth);
  const {arrowContainer} = styles;

  const {t} = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const {password} = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    secureLogin({username: '', password: fields.password});
  };

  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  return (
    <Container
      flex
      style={{paddingTop: 8}}
      useKeyboard
      keyboardVerticalOffset={48}>
      <Container>
        <Image
          source={LOGO}
          style={{width: 150, height: 50, alignSelf: 'center'}}
          resizeMode="contain"
        />
        <Container crossCenter style={arrowContainer}>
          <Touchable onPress={onPressBack}>
            <Image
              source={ARROW_LEFT_GRAY_ICON}
              style={{width: 20, height: 20, margin: 16}}
              resizeMode="contain"
            />
          </Touchable>
        </Container>
      </Container>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          alignItems: 'center',
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <TextContainer
          text={
            userAuth.name !== ''
              ? t('login:hi', {name: userAuth.name})
              : t('login:enterPassword')
          }
          typography="h3"
          marginTop={55}
        />

        <TextContainer
          text={userAuth.name !== '' ? t('login:welcome') : ''}
          fontSize={16}
          marginTop={8}
          textColor={Theme.Colors.Black}
        />

        <Container width="100%">
          <Input
            name="password"
            control={control}
            autoComplete="password"
            autoCorrect={false}
            passwordField
            placeholder={t('login:enterPassword')}
            blurOnSubmit={false}
            marginTop={36}
            rules={passwordRule}
            error={errors.password?.message}
            prefixImage={LOCK_ICON}
            ref={passwordRef}
          />

          <TouchableText
            text={t('login:forgotPassword')}
            marginTop={32}
            typography="link"
            textAlign="center"
            onPress={onPressForgotPassword}
          />
        </Container>

        <Container flex />

        <Button
          label={t('login:getInto')}
          onPress={handleSubmit(submit)}
          marginTop={40}
          marginBottom={24}
          disabled={!password}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },
});

export default LoginScreen;
