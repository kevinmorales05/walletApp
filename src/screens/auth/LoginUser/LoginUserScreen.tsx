import {LOGO, USER_ICON} from '../../../assets/images';
import {
  Button,
  Container,
  Input,
  TextContainer,
  TextSpan,
  TouchableText,
} from '../../../components';
import React from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView} from 'react-native';
import {emailRules} from '../../../utils/rules';

interface Props {
  onPressBack: () => void;
  onPressForgotUsername: () => void;
  onPressSubmit: (username: string) => void;
  onOnboarding: () => void;
}

const LoginUserScreen: React.FC<Props> = ({
  onPressBack,
  onPressForgotUsername,
  onPressSubmit,
  onOnboarding,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const {username} = watch();

  const {t} = useTranslation();

  const submit: SubmitHandler<FieldValues> = fields => {
    console.log(fields.username);
    onPressSubmit(fields.username);
  };

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
          text={t('loginUser:logIn')}
          typography="h3"
          marginTop={55}
        />

        <TextContainer text="" fontSize={16} marginTop={8} />

        <Container width="100%">
          <Input
            name="username"
            control={control}
            autoComplete="username"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder={t('loginUser:enterUsername')}
            blurOnSubmit={false}
            rules={emailRules}
            error={errors.username?.message}
            prefixImage={USER_ICON}
            marginTop={36}
          />

          <TouchableText
            text={t('loginUser:forgotUsername')}
            marginTop={32}
            typography="link"
            textAlign="center"
            onPress={onPressForgotUsername}
          />
        </Container>

        <Container flex />

        <Button
          label={t('global:continue')}
          onPress={handleSubmit(submit)}
          variant="black"
          marginTop={40}
          marginBottom={24}
          disabled={!username}
        />

        <TextSpan textAlign="center" marginBottom={24}>
          <TextSpan
            text={`${t('loginUser:notHaveAccount')}   `}
            typography="paragraph"
          />
          <TextSpan
            text={t('loginUser:createOne')}
            typography="link2"
            underline
            onPress={onOnboarding}
          />
        </TextSpan>
      </ScrollView>
    </Container>
  );
};

export default LoginUserScreen;
