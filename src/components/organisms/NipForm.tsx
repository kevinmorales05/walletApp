import React, {useRef} from 'react';
import {ScrollView, TextInput, Dimensions} from 'react-native';
import {Container, Input} from '../../components';
import {Button, TextContainer} from '../molecules';
import {useTranslation} from 'react-i18next';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import Theme from '../../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {confirmOtpRule} from '../../utils/rules';

interface Props {
  onSubmit: (nip: string, confirmNip: string) => void;
  onPressBack: () => void;
}

interface PasswordConditionProps {
  condition: string;
}

const NipForm: React.FC<Props> = ({onSubmit, onPressBack}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const nipRef = useRef<TextInput>(null);
  const confirmNipRef = useRef<TextInput>(null);

  const {nip, confirmNip} = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields.nip, fields.confirmNip);
  };

  const BUTTON_WIDTH = (Dimensions.get('window').width - 12 * 2 - 12 * 2) / 2;

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
          text={t('nipForm:title')}
          textAlign="center"
          typography="h3"
          marginBottom={8}
        />

        <TextContainer
          text={t('nipForm:instructions')}
          textAlign="center"
          typography="h5"
          marginBottom={32}
        />

        <Input
          ref={nipRef}
          name="nip"
          control={control}
          passwordField
          autoCorrect={false}
          keyboardType="number-pad"
          label={t('nipForm:nip')}
          blurOnSubmit={false}
          onSubmitEditing={() => confirmNipRef.current?.focus()}
          error={errors.nip?.message}
          maxLength={6}
        />

        <Input
          ref={confirmNipRef}
          marginTop={16}
          name="confirmNip"
          control={control}
          passwordField
          autoCorrect={false}
          keyboardType="number-pad"
          label={t('nipForm:confirmNip')}
          blurOnSubmit={false}
          onSubmitEditing={() => confirmNipRef.current?.blur()}
          error={errors.confirmNip?.message}
          maxLength={6}
          rules={confirmOtpRule(nip)}
        />

        <TextContainer
          text={t('nipForm:nipMustHave')}
          typography="description"
          marginTop={16}
          marginBottom={8}
        />
        <PasswordCondition condition={t('nipForm:condition1')} />
        <PasswordCondition condition={t('nipForm:condition2')} />

        <Container row space="between" flex>
          <Container width={BUTTON_WIDTH}>
            <Button
              label={t('global:goBack')}
              onPress={onPressBack}
              variant="gray"
              marginTop={40}
              marginBottom={24}
              disabled={false}
            />
          </Container>

          <Container width={BUTTON_WIDTH}>
            <Button
              label={t('global:next')}
              onPress={handleSubmit(submit)}
              marginTop={40}
              marginBottom={24}
              disabled={!nip || !confirmNip}
            />
          </Container>
        </Container>
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

export {NipForm};
