import React, {useRef, useState} from 'react';
import {ScrollView, Dimensions, Text, TextInput} from 'react-native';
import {Container, Input} from '../atoms';
import {Button, TextContainer} from '../molecules';
import {useTranslation} from 'react-i18next';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {
  alphabetRule,
  curpRule,
  mobilePhoneRule,
  rfcRule,
} from '../../utils/rules';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Radio from '../molecules/Radio';

interface Props {
  onSubmit: (
    name: string,
    lastName: string,
    secondLastName: string,
    gender: number,
    mobilePhone: string,
    curp: string,
    rfc: string,
  ) => void;
  onPressBack: () => void;
}

const PersonalDataForm: React.FC<Props> = ({onSubmit, onPressBack}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const nameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const secondLastNameRef = useRef<TextInput>(null);
  const mobilePhoneRef = useRef<TextInput>(null);
  const curpRef = useRef<TextInput>(null);
  const rfcRef = useRef<TextInput>(null);

  const {name, lastName, secondLastName, mobilePhone, curp, rfc} = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    // eslint-disable-next-line no-param-reassign
    fields.gender = selectedGender;
    onSubmit(
      fields.name,
      fields.lastName,
      fields.secondLastName,
      fields.gender,
      fields.mobilePhone,
      fields.curp,
      fields.rfc,
    );
  };

  const BUTTON_WIDTH = (Dimensions.get('window').width - 12 * 2 - 12 * 2) / 2;

  const [selectedGender, setSelectedGender] = useState(0);

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
          text={t('personalData:title')}
          textAlign="center"
          typography="h3"
          marginBottom={8}
        />

        <TextContainer
          text={t('personalData:instructions')}
          textAlign="center"
          typography="h5"
          marginBottom={32}
        />

        <Input
          {...register('name')}
          ref={nameRef}
          name="name"
          control={control}
          autoComplete="name"
          autoCorrect
          autoCapitalize="words"
          keyboardType="default"
          label={t('personalData:name')}
          placeholder={t('personalData:namePlaceholder')}
          rules={alphabetRule(true)}
          blurOnSubmit={false}
          onSubmitEditing={() => lastNameRef.current?.focus()}
          error={errors.name?.message}
          maxLength={25}
        />

        <Container row space="between" flex>
          <Container width={BUTTON_WIDTH}>
            <Input
              {...register('lastName')}
              ref={lastNameRef}
              name="lastName"
              control={control}
              autoComplete="name"
              autoCorrect
              autoCapitalize="words"
              keyboardType="default"
              label={t('personalData:firstLastName')}
              placeholder={t('personalData:firstLastNamePlaceholder')}
              rules={alphabetRule(true)}
              blurOnSubmit={false}
              onSubmitEditing={() => secondLastNameRef.current?.focus()}
              error={errors.lastName?.message}
              marginTop={24}
              maxLength={15}
            />
          </Container>

          <Container width={BUTTON_WIDTH}>
            <Input
              {...register('secondLastName')}
              ref={secondLastNameRef}
              name="secondLastName"
              control={control}
              autoComplete="name"
              autoCorrect
              autoCapitalize="words"
              keyboardType="default"
              label={t('personalData:secondLastName')}
              placeholder={t('personalData:secondLastNamePlaceholder')}
              rules={alphabetRule(true)}
              blurOnSubmit={false}
              onSubmitEditing={() => mobilePhoneRef.current?.focus()}
              error={errors.secondLastName?.message}
              marginTop={24}
              maxLength={15}
            />
          </Container>
        </Container>

        <Container row alignment="start" style={{marginTop: 40}}>
          <Container>
            <Radio
              {...register('gender')}
              size={25}
              onPress={() => setSelectedGender(2)}
              selected={selectedGender === 2}>
              <Text>{t('personalData:women')}</Text>
            </Radio>
          </Container>
          <Container style={{marginLeft: 50}}>
            <Radio
              {...register('gender')}
              size={25}
              onPress={() => setSelectedGender(1)}
              selected={selectedGender === 1}>
              <Text>{t('personalData:men')}</Text>
            </Radio>
          </Container>
        </Container>

        <Input
          {...register('mobilePhone')}
          ref={mobilePhoneRef}
          name="mobilePhone"
          control={control}
          autoCorrect={false}
          keyboardType="phone-pad"
          label={t('personalData:phone')}
          placeholder={t('personalData:phonePlaceholder')}
          rules={mobilePhoneRule}
          blurOnSubmit={false}
          onSubmitEditing={() => curpRef.current?.focus()}
          error={errors.mobilePhone?.message}
          marginTop={24}
          maxLength={10}
        />

        <Input
          {...register('curp')}
          ref={curpRef}
          name="curp"
          control={control}
          autoCorrect={false}
          autoCapitalize="characters"
          keyboardType="default"
          label={t('personalData:curp')}
          placeholder={t('personalData:curpPlaceholder')}
          rules={curpRule}
          blurOnSubmit={false}
          onSubmitEditing={() => rfcRef.current?.focus()}
          error={errors.curp?.message}
          marginTop={24}
          maxLength={18}
        />

        <Input
          {...register('rfc')}
          ref={rfcRef}
          name="rfc"
          control={control}
          autoCorrect={false}
          keyboardType="default"
          autoCapitalize="characters"
          label={t('personalData:rfc')}
          placeholder={t('personalData:rfcPlaceholder')}
          rules={rfcRule}
          blurOnSubmit={false}
          onSubmitEditing={() => rfcRef.current?.blur()}
          error={errors.rfc?.message}
          marginTop={24}
          maxLength={13}
        />

        <Container row space="between" flex>
          <Container width={BUTTON_WIDTH}>
            <Button
              label={t('global:goBack')}
              onPress={onPressBack}
              variant="gray"
              marginTop={40}
              marginBottom={24}
            />
          </Container>

          <Container width={BUTTON_WIDTH}>
            <Button
              label={t('global:next')}
              onPress={handleSubmit(submit)}
              marginTop={40}
              marginBottom={24}
              disabled={
                !name ||
                !lastName ||
                !secondLastName ||
                !selectedGender ||
                !mobilePhone ||
                !curp ||
                !rfc
              }
            />
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export {PersonalDataForm};
