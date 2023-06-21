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
  onSubmit: (nip: string) => void;
  onCancel: () => void;
}

const NipModal: React.FC<Props> = ({visible, onSubmit, onCancel}) => {
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

  const {nip} = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields.nip);
    setValue('nip', '');
  };

  return (
    <Modal visible={visible}>
      <Container
        flex
        alignment="end"
        style={{padding: 16, marginBottom: insets.bottom}}>
        <Container style={containerStyle}>
          <TextContainer
            text={t('nipModal:enterNip')}
            typography="h4"
            marginBottom={8}
          />
          <TextContainer
            text={`${t('nipModal:generateCode')}`}
            typography="h5"
            marginBottom={24}
          />

          <Container width={200}>
            <Input
              ref={inputRef}
              name="nip"
              control={control}
              centerElements
              placeholder="NIP"
              keyboardType="number-pad"
              autoFocus
              rules={otpRule}
              maxLength={6}
              error={errors.nip?.message}
            />
          </Container>

          <TouchableText
            text={`${t('nipModal:forgotNip')}`}
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
                  setValue('nip', '');
                }}
                variant="gray"
              />
            </Container>
            <Container flex style={{marginLeft: 8}}>
              <Button
                label={t('global:validate')}
                onPress={handleSubmit(submit)}
                disabled={!nip}
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

export {NipModal};
