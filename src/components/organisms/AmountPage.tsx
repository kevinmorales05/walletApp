import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Container, Input, Text} from '../../components/atoms';
import {
  AddresseeComponent,
  Button,
  TouchableText,
} from '../../components/molecules';
import Theme from '../../theme';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {DOLLAR_ICON} from '../../assets/images';
import {amountRule} from '../../utils/rules';

interface Props {
  onPressChange: () => void;
  onSubmit: (amount: string) => void;
  balance: number;
}

const AmountPage: React.FC<Props> = ({onPressChange, onSubmit, balance}) => {
  const {amountContainer} = styles;
  const {t} = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const {amount} = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields.amount);
  };

  return (
    <Container flex useKeyboard keyboardVerticalOffset={230}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Container style={{paddingHorizontal: 16}}>
          <Container row space="between" style={{marginBottom: 8}}>
            <Text text={t('addressee:addressee')} typography="h4" />
            <TouchableText
              text={t('amount:change')}
              typography="link2"
              underline
              onPress={onPressChange}
            />
          </Container>
          <AddresseeComponent
            shortName="Betica"
            fullName="Beatriz Aurora Pinzón Solano"
            account="Cuenta **** 3123"
            renderBorder={false}
            shadow
            padding={16}
          />
        </Container>

        <Container flex style={amountContainer}>
          <Text text={t('amount:amount')} typography="h4" />

          <Input
            name="amount"
            control={control}
            prefixImage={DOLLAR_ICON}
            placeholder="00.00"
            marginTop={24}
            rules={amountRule(balance)}
            error={errors.amount?.message}
            keyboardType="decimal-pad"
          />

          <Container flex />

          <Button
            label={t('global:continue')}
            variant="black"
            onPress={handleSubmit(submit)}
            disabled={!amount || !Number(amount)}
            marginVertical={32}
          />
        </Container>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  amountContainer: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 18,
    marginTop: 24,
    backgroundColor: Theme.Colors.Bright,
  },
});

export {AmountPage};
