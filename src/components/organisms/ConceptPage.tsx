import {DOLLAR_ICON} from '../../assets/images';
import {Card, Container, Input, Text, TextSpan} from '../../components/atoms';
import {
  AddresseeComponent,
  Button,
  TextContainer,
  TouchableText,
} from '../../components/molecules';
import React from 'react';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, StyleSheet} from 'react-native';
import Theme from '../../theme';
import {alphabetRule} from '../../utils/rules';

interface Props {
  onSubmit: (concept: string) => void;
  onPressChange: (index: number) => void;
  amount: string;
}

const ConceptPage: React.FC<Props> = ({onSubmit, onPressChange, amount}) => {
  const {amountContainer} = styles;
  const {t} = useTranslation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields.concept || '');
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
              onPress={() => onPressChange(0)}
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
          <Container
            row
            space="between"
            style={{marginBottom: 8, marginTop: 16}}>
            <Text text={t('concept:concept')} typography="h4" />
            <TouchableText
              text={t('amount:change')}
              typography="link2"
              underline
              onPress={() => onPressChange(1)}
            />
          </Container>
          <Card center>
            <Container
              middle
              width={32}
              height={32}
              circle
              backgroundColor={Theme.Colors.MedGray}>
              <Image
                source={DOLLAR_ICON}
                style={{width: 16, height: 16}}
                resizeMode="contain"
              />
            </Container>
            <TextContainer
              text={amount}
              fontWeight="Bold"
              fontSize={18}
              textColor={Theme.Colors.Text}
              marginLeft={16}
            />
          </Card>
        </Container>

        <Container flex style={amountContainer}>
          <TextSpan>
            <TextSpan text={`${t('concept:concept')} `} typography="h4" />
            <TextSpan
              text={` ${t('concept:optional')}`}
              typography="placeholder"
            />
          </TextSpan>

          <Input
            name="concept"
            control={control}
            marginTop={24}
            rules={alphabetRule(false)}
            error={errors.concept?.message}
            autoCapitalize="sentences"
            autoCorrect
          />

          <Container flex />

          <Button
            label={t('global:continue')}
            variant="black"
            onPress={handleSubmit(submit)}
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
    paddingTop: 24,
    marginTop: 24,
    backgroundColor: Theme.Colors.Bright,
  },
});

export {ConceptPage};
