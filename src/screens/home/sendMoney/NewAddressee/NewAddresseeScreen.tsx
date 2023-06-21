import React, {useRef} from 'react';
import {Image, ScrollView, StyleSheet, TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Controller, FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Button,
  Card,
  CheckBox,
  Container,
  Input,
  Text,
  TextContainer,
  Touchable,
} from '../../../../components';
import {ARROW_LEFT_BLACK_ICON, INFO_ICON} from '../../../../assets/images';
import Theme from '../../../../theme';
import {alphabetRule} from '../../../../utils/rules';

interface Props {
  account: string;
  onSubmit: (name: string, aka: string, save: boolean) => void;
  onPressBack: () => void;
}

const NewAddresseeScreen: React.FC<Props> = ({
  onPressBack,
  onSubmit,
  account,
}) => {
  const {arrowContainer, arrowStyle} = styles;
  const {t} = useTranslation();

  const insets = useSafeAreaInsets();

  const nameRef = useRef<TextInput>(null);
  const akaRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
    setValue,
  } = useForm();

  const {name, aka} = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields.name, fields.aka, fields.save);
  };

  return (
    <Container flex useKeyboard>
      <Container
        style={{paddingHorizontal: 16, paddingVertical: 11}}
        backgroundColor={Theme.Colors.Bright}>
        <Text
          text={t('newAddressee:newAddressee')}
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
      <ScrollView
        bounces={false}
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom,
          paddingTop: 16,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Card
          paddingHorizontal={24}
          paddingVertical={16}
          shadow={false}
          backgroundColor={Theme.Colors.CalcareousSinter}>
          <Image
            source={INFO_ICON}
            style={{width: 6, height: 16}}
            resizeMode="contain"
          />
          <TextContainer
            text={t('newAddressee:completeInfo')}
            marginLeft={16}
            typography="description"
          />
        </Card>

        <Card style={{marginTop: 16}} column>
          <TextContainer
            text={t('newAddressee:account')}
            fontWeight="Bold"
            fontSize={14}
            textColor={Theme.Colors.BluishGrey}
            marginBottom={4}
          />
          <TextContainer
            text={account}
            fontWeight="Regular"
            fontSize={14}
            textColor={Theme.Colors.Black}
            marginBottom={16}
          />

          <Container
            width="100%"
            height={1}
            backgroundColor={Theme.Colors.UltralightGrey}
          />

          <Input
            ref={nameRef}
            name="name"
            control={control}
            autoCapitalize="words"
            autoCorrect
            error={errors.name?.message}
            label={t('newAddressee:beneficiary')}
            marginTop={24}
            rules={alphabetRule(true)}
            onSubmitEditing={() => akaRef.current?.focus()}
          />

          <Input
            ref={akaRef}
            name="aka"
            control={control}
            autoCapitalize="words"
            autoCorrect
            error={errors.aka?.message}
            label={t('newAddressee:contactAliases')}
            marginTop={16}
            rules={alphabetRule(true)}
            onSubmitEditing={() => akaRef.current?.blur()}
          />

          <Container
            crossAlignment="start"
            row
            style={{marginTop: 16, marginBottom: 8}}>
            <Controller
              name="save"
              control={control}
              defaultValue={false}
              render={({field}) => (
                <CheckBox
                  size={24}
                  selected={field.value}
                  onPress={() => setValue('save', !field.value)}
                />
              )}
            />
            <Container style={{marginLeft: 8}}>
              <Text
                text={t('newAddressee:saveContact')}
                typography="paragraph"
              />
              <TextContainer
                text={t('newAddressee:saveContactMsg')}
                typography="label"
                marginTop={4}
              />
            </Container>
          </Container>
        </Card>

        <Container row style={{marginVertical: 30}}>
          <Container flex style={{marginRight: 8}}>
            <Button
              label={t('global:cancel')}
              variant="gray"
              onPress={onPressBack}
            />
          </Container>
          <Container flex style={{marginLeft: 8}}>
            <Button
              label={t('global:add')}
              onPress={handleSubmit(submit)}
              disabled={!name || !aka}
            />
          </Container>
        </Container>
      </ScrollView>
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

export default NewAddresseeScreen;
