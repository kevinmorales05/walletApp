import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Dimensions, TextInput} from 'react-native';
import {Button, CheckBox, TextContainer} from '../../components/molecules';
import {useTranslation} from 'react-i18next';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container, Input, Picker, TextSpan} from '../../components/atoms';
import {ZipCodeInfoResponse} from '../../services';
import {MEXICO_STATES} from '../../assets/files';
import {alphabetRule} from '../../utils/rules';

interface Props {
  zipCodeInfo: ZipCodeInfoResponse;
  onSubmit: (
    addressStreet: string,
    addressInteriorNumber: string,
    addressExteriorNumber: string,
    addressZip: string,
    addressState: string,
    addressCity: string,
    addressSuburb: string,
    noticePrivacy: boolean,
  ) => void;
  onPressBack: () => void;
  onChangeZipCode: (zipCode: string) => void;
}

const AddressDataForm: React.FC<Props> = ({
  onSubmit,
  onPressBack,
  onChangeZipCode,
  zipCodeInfo,
}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const interiorNumberRef = useRef<TextInput>(null);
  const exteriorNumberRef = useRef<TextInput>(null);
  const zipCodeRef = useRef<TextInput>(null);
  const addressCityRef = useRef<TextInput>(null);
  const addressSuburbRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
    register,
    setValue,
  } = useForm();

  const {
    addressStreet,
    addressInteriorNumber,
    addressExteriorNumber,
    addressZip,
    addressState,
    addressCity,
    addressSuburb,
  } = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(
      fields.addressStreet,
      fields.addressInteriorNumber,
      fields.addressExteriorNumber,
      fields.addressZip,
      fields.addressState,
      fields.addressCity,
      fields.addressSuburb,
      fields.noticePrivacy,
    );
  };

  const BUTTON_WIDTH = (Dimensions.get('window').width - 12 * 2 - 12 * 2) / 2;

  const [selectedNoticePrivacy, setSelectedNoticePrivacy] = useState(false);
  const [stateDisabled, setStateDisabled] = useState<boolean>(false);
  const [cityDisabled, setCityDisabled] = useState<boolean>(false);
  const [suburbDisabled, setSuburbDisabled] = useState<boolean>(false);

  useEffect(() => {
    onChangeZipCode(addressZip);

    if (!addressZip) setValue('addressState', '');
  }, [addressZip]);

  useEffect(() => {
    setValue('addressState', zipCodeInfo.state);
    setValue('addressCity', zipCodeInfo.municipality);

    if (zipCodeInfo.colonies.length === 1)
      setValue('addressSuburb', zipCodeInfo.colonies[0]);
    else if (zipCodeInfo.colonies.length === 0) setValue('addressSuburb', '');

    setStateDisabled(!!zipCodeInfo.state);
    setCityDisabled(!!zipCodeInfo.municipality);
    setSuburbDisabled(zipCodeInfo.colonies.length === 1);
  }, [zipCodeInfo]);

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
          text={t('addressData:title')}
          textAlign="center"
          typography="h3"
          marginBottom={8}
        />

        <TextContainer
          text={t('addressData:instructions')}
          textAlign="center"
          typography="h5"
          marginBottom={32}
        />

        <Input
          {...register('addressStreet')}
          control={control}
          autoCapitalize="words"
          keyboardType="default"
          label={t('addressData:street')}
          blurOnSubmit={false}
          placeholder={t('addressData:streetPlaceholder')}
          rules={alphabetRule(true)}
          error={errors.addressStreet?.message}
          onSubmitEditing={() => interiorNumberRef.current?.focus()}
          maxLength={30}
        />

        <Container row space="between" flex>
          <Container width={BUTTON_WIDTH}>
            <Input
              {...register('addressInteriorNumber')}
              ref={interiorNumberRef}
              control={control}
              keyboardType="numbers-and-punctuation"
              label={t('addressData:interiorNumber')}
              blurOnSubmit={false}
              placeholder={t('addressData:interiorNumberPlaceholder')}
              error={errors.interiorNumber?.message}
              marginTop={24}
              onSubmitEditing={() => exteriorNumberRef.current?.focus()}
              maxLength={5}
            />
          </Container>

          <Container width={BUTTON_WIDTH}>
            <Input
              {...register('addressExteriorNumber')}
              ref={exteriorNumberRef}
              control={control}
              keyboardType="numbers-and-punctuation"
              label={t('addressData:exteriorNumber')}
              blurOnSubmit={false}
              placeholder={t('addressData:exteriorNumberPlaceholder')}
              error={errors.exteriorNumber?.message}
              marginTop={24}
              onSubmitEditing={() => zipCodeRef.current?.focus()}
              maxLength={5}
            />
          </Container>
        </Container>

        <Input
          {...register('addressZip')}
          ref={zipCodeRef}
          control={control}
          keyboardType="number-pad"
          label={t('addressData:postalCode')}
          placeholder={t('addressData:postalCodePlaceholder')}
          error={errors.postalCode?.message}
          marginTop={24}
          maxLength={5}
          onSubmitEditing={() => addressCityRef.current?.focus()}
        />

        {!stateDisabled && !!addressZip ? (
          <Picker
            name="addressState"
            control={control}
            options={MEXICO_STATES.map(item => item.name)}
            onSelect={value => setValue('addressState', value)}
            androidMode="dialog"
            label={t('addressData:state')}
            placeholder={t('addressData:state')}
            error={errors.state?.message}
            marginTop={24}
          />
        ) : (
          <Input
            {...register('addressState')}
            control={control}
            keyboardType="default"
            autoCapitalize="words"
            label={t('addressData:state')}
            placeholder={t('addressData:statePlaceholder')}
            rules={alphabetRule(true)}
            blurOnSubmit={false}
            error={errors.addressState?.message}
            marginTop={24}
            editable={!stateDisabled && !!addressZip}
            maxLength={25}
          />
        )}

        <Input
          {...register('addressCity')}
          ref={addressCityRef}
          control={control}
          keyboardType="default"
          autoCapitalize="words"
          label={t('addressData:city')}
          placeholder={t('addressData:cityPlaceholder')}
          rules={alphabetRule(true)}
          blurOnSubmit={false}
          error={errors.addressCity?.message}
          marginTop={24}
          editable={!cityDisabled && !!addressZip}
          maxLength={25}
          onSubmitEditing={() => addressSuburbRef.current?.focus()}
        />

        {zipCodeInfo.colonies.length > 1 ? (
          <Picker
            name="addressSuburb"
            control={control}
            options={zipCodeInfo.colonies}
            onSelect={value => setValue('suburb', value)}
            androidMode="dialog"
            label={t('addressData:suburb')}
            placeholder={t('addressData:suburb')}
            rules={alphabetRule(true)}
            error={errors.addressSuburb?.message}
            marginTop={24}
          />
        ) : (
          <Input
            {...register('addressSuburb')}
            ref={addressSuburbRef}
            control={control}
            keyboardType="default"
            autoCapitalize="words"
            label={t('addressData:suburb')}
            placeholder={t('addressData:suburbPlaceholder')}
            rules={alphabetRule(true)}
            blurOnSubmit={false}
            error={errors.addressSuburb?.message}
            marginTop={24}
            editable={!suburbDisabled && !!addressZip}
            maxLength={25}
            onSubmitEditing={() => addressSuburbRef.current?.blur()}
          />
        )}

        <Container
          crossAlignment="start"
          row
          style={{marginTop: 16, marginBottom: 8}}>
          <CheckBox
            {...register('noticePrivacy')}
            size={24}
            selected={selectedNoticePrivacy}
            onPress={() => {
              setSelectedNoticePrivacy(!selectedNoticePrivacy);
            }}
          />
          <TextSpan marginLeft={8} textAlign="left">
            <TextSpan
              text={`${t('addressData:noticePrivacy')}    `}
              typography="paragraph"
            />
            <TextSpan
              textAlign="left"
              text={t('addressData:noticePrivacy_link')}
              typography="link2"
              underline
            />
          </TextSpan>
        </Container>

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
                !addressStreet ||
                !addressInteriorNumber ||
                !addressExteriorNumber ||
                !addressZip ||
                !addressState ||
                !addressCity ||
                !addressSuburb ||
                !selectedNoticePrivacy
              }
            />
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

export {AddressDataForm};
