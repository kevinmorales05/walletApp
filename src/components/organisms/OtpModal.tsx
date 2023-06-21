import {Container, Input, Modal} from '../atoms';
import {Button, TextContainer, TouchableText} from '../molecules';
import React, {useRef} from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Theme from '../../theme';
import {otpRule} from '../../utils/rules';

interface Props {
  visible: boolean;
  email?: string;
  phone?: string;
  onSubmit: (otp: number) => void;
  onCancel: () => void;
}

const OtpModal: React.FC<Props> = ({
  visible,
  email,
  phone,
  onSubmit,
  onCancel,
}) => {
  const {containerStyle} = styles;
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
    setValue,
  } = useForm();

  const inputRef = useRef<TextInput>(null);

  const {otpCode} = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields.otpCode);
    setValue('otpCode', '');
  };

  return (
    <Modal visible={visible}>
      <Container
        flex
        alignment="end"
        style={{padding: 16, marginBottom: insets.bottom}}>
        <Container style={containerStyle}>
          {email !== '' ? (
            <>
              <TextContainer
                text={t('otpModal:validateEmail')}
                typography="h4"
                marginBottom={8}
              />
              <TextContainer
                text={`${t('otpModal:sentEmailCode')} ${email}`}
                typography="h5"
                marginBottom={24}
              />
            </>
          ) : (
            <>
              <TextContainer
                text={t('otpModal:validatePhone')}
                typography="h4"
                marginBottom={8}
              />
              <TextContainer
                text={`${t('otpModal:sentPhoneCode')} ${phone}`}
                typography="h5"
                marginBottom={24}
              />
            </>
          )}

          <Container width={200}>
            <Input
              ref={inputRef}
              name="otpCode"
              control={control}
              centerElements
              placeholder={t('otpModal:digitCode')}
              keyboardType="number-pad"
              autoComplete="password"
              autoFocus
              rules={otpRule}
              maxLength={6}
              error={errors.otpCode?.message}
            />
          </Container>

          <TouchableText
            text={`${t('otpModal:sendNewCode')}`}
            typography="link"
            marginTop={35}
            onPress={() => {}}
          />

          <Container row style={{marginTop: 32}}>
            <Container flex style={{marginRight: 8}}>
              <Button
                label={t('global:cancel')}
                onPress={() => {
                  onCancel();
                  setValue('otpCode', '');
                }}
                variant="gray"
              />
            </Container>
            <Container flex style={{marginLeft: 8}}>
              <Button
                label={t('global:validate')}
                onPress={handleSubmit(submit)}
                disabled={!otpCode}
              />
            </Container>
          </Container>
        </Container>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: Theme.Colors.Bright,
    alignItems: 'center',
  },
});

export {OtpModal};
