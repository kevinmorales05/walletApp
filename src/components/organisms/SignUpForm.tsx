import React, {useRef} from 'react';
import {ScrollView, TextInput} from 'react-native';
import {Container, Input, TextSpan} from '../atoms';
import {Button, TextContainer} from '../molecules';
import {useTranslation} from 'react-i18next';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import Theme from '../../theme';
import {confirmPasswordRule, emailRules, passwordRule} from '../../utils/rules';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  onSubmit: (email: string, password: string) => void;
  onLogin: () => void;
}

interface PasswordConditionProps {
  condition: string;
}

const SignUpForm: React.FC<Props> = ({onSubmit, onLogin}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const {email, password, confirmPassword} = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields.email, fields.password);
  };

  return (
    <Container flex useKeyboard keyboardVerticalOffset={225}>
      <ScrollView
        bounces={false}
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <TextContainer
          text={t('signUp:title')}
          textAlign="center"
          typography="h3"
          marginBottom={8}
        />
        <TextContainer
          text={t('signUp:instructions')}
          textAlign="center"
          typography="h5"
          marginBottom={32}
        />

        <Input
          ref={emailRef}
          name="email"
          control={control}
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          label={t('signUp:email')}
          placeholder={t('signUp:emailPlaceholder')}
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          rules={emailRules}
          error={errors.email?.message}
        />

        <Input
          ref={passwordRef}
          name="password"
          control={control}
          autoComplete="password"
          autoCorrect={false}
          passwordField
          label={t('signUp:password')}
          placeholder={t('signUp:passwordPlaceholder')}
          blurOnSubmit={false}
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          marginTop={24}
          rules={passwordRule}
          error={errors.password?.message}
        />

        <Input
          ref={confirmPasswordRef}
          name="confirmPassword"
          control={control}
          autoCorrect={false}
          passwordField
          label={t('signUp:confirmPassword')}
          placeholder={t('signUp:passwordPlaceholder')}
          blurOnSubmit={false}
          onSubmitEditing={() => confirmPasswordRef.current?.blur()}
          marginTop={24}
          rules={confirmPasswordRule(password)}
          error={errors.confirmPassword?.message}
        />

        <TextContainer
          text={t('signUp:passwordMustHave')}
          typography="description"
          marginTop={16}
          marginBottom={8}
        />
        <PasswordCondition condition={t('signUp:condition1')} />
        <PasswordCondition condition={t('signUp:condition2')} />
        <PasswordCondition condition={t('signUp:condition3')} />

        <Button
          label={t('global:next')}
          onPress={handleSubmit(submit)}
          marginTop={40}
          marginBottom={24}
          disabled={!email || !password || !confirmPassword}
        />

        <TextSpan textAlign="center" marginBottom={24}>
          <TextSpan
            text={`${t('signUp:haveAccount')}    `}
            typography="paragraph"
          />
          <TextSpan
            text={t('signUp:login')}
            typography="link2"
            underline
            onPress={onLogin}
          />
        </TextSpan>
      </ScrollView>
    </Container>
  );
};

const PasswordCondition: React.FC<PasswordConditionProps> = ({condition}) => (
  <Container row center style={{marginLeft: 10, marginTop: 8}}>
    <Container
      width={10}
      height={10}
      circle
      backgroundColor={Theme.Colors.BrassBalls}
    />
    <TextContainer text={condition} typography="description" marginLeft={12} />
  </Container>
);

export {SignUpForm};
