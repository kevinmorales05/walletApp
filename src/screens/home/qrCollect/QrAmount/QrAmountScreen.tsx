import React, {useRef} from 'react';
import {Image, StyleSheet, TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ARROW_LEFT_BLACK_ICON} from 'assets/images';

import {
  Container,
  Text,
  TextContainer,
  Touchable,
  Input,
  Button,
  TextSpan,
} from '../../../../components';
import Theme from '../../../../theme';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {amountRule} from '../../../../utils/rules';

interface Props {
  onPressBack: () => void;
  onPressUnavailableItem: () => void;
  onSubmit: (amount: number) => void;
}

const QrAmountScreen: React.FC<Props> = ({
  onPressBack,
  onPressUnavailableItem,
  onSubmit,
}) => {
  const {arrowContainer, arrowStyle} = styles;
  const {t} = useTranslation();

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const amountRef = useRef<TextInput>(null);

  const {amount} = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    console.log(fields);
    // eslint-disable-next-line no-param-reassign
    onSubmit(fields.amount);
  };

  return (
    <Container flex>
      <Container
        style={{paddingHorizontal: 16, paddingVertical: 11}}
        backgroundColor={Theme.Colors.Bright}>
        <Text
          text={t('qrAmount:qrAmount')}
          typography="h3"
          textAlign="center"
        />
        <Container style={arrowContainer}>
          <Touchable onPress={onPressBack} rounded>
            <Image
              source={ARROW_LEFT_BLACK_ICON}
              style={arrowStyle}
              resizeMode="contain"
            />
          </Touchable>
        </Container>
      </Container>

      <Container
        flex
        backgroundColor={Theme.Colors.UltralightGrey}
        style={{paddingHorizontal: 16}}>
        <TextContainer
          text={t('qrAmount:doPayment')}
          textAlign="center"
          typography="h4"
          marginTop={24}
        />
        <TextContainer
          text={t('qrAmount:generateCode')}
          textAlign="center"
          typography="h5"
          marginTop={8}
        />

        <Input
          {...register('amount')}
          ref={amountRef}
          name="amount"
          control={control}
          keyboardType="numeric"
          label={t('qrAmount:enterAmount')}
          placeholder={t('qrAmount:amountPlaceholder')}
          rules={amountRule(100000)}
          blurOnSubmit={false}
          onSubmitEditing={() => amountRef.current?.blur()}
          error={errors.amount?.message}
          maxLength={25}
          marginTop={36}
        />

        <Container flex />

        <Button
          label={t('qrAmount:btnGenerateCode')}
          onPress={handleSubmit(submit)}
          marginTop={40}
          marginBottom={24}
          disabled={!amount}
        />
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  arrowStyle: {
    width: 19,
    height: 22,
    marginHorizontal: 16,
    marginVertical: 12,
  },
});

export default QrAmountScreen;
