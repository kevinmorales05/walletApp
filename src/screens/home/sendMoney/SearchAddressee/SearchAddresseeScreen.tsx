import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  ARROW_LEFT_BLACK_ICON,
  SEARCH_ILLUSTRATION,
} from '../../../../assets/images';
import {
  Button,
  Card,
  Container,
  Input,
  Text,
  TextContainer,
  Touchable,
} from '../../../../components';
import Theme from '../../../../theme';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {searchAccountRule} from '../../../../utils/rules';

interface Props {
  onPressBack: () => void;
  onSubmit: (query: string) => void;
}

const SearchAddresseeScreen: React.FC<Props> = ({onPressBack, onSubmit}) => {
  const {arrowContainer, arrowStyle, searchIllustrationStyle} = styles;
  const {t} = useTranslation();

  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const {search} = watch();

  const submit: SubmitHandler<FieldValues> = fields => {
    onSubmit(fields.search);
  };

  return (
    <Container flex useKeyboard>
      <Container
        style={{paddingHorizontal: 16, paddingVertical: 11}}
        backgroundColor={Theme.Colors.Bright}>
        <Text
          text={t('searchAddressee:newAddressee')}
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
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Container flex crossCenter>
          <Image
            source={SEARCH_ILLUSTRATION}
            style={searchIllustrationStyle}
            resizeMode="contain"
          />
          <Card column paddingHorizontal={16} paddingVertical={24}>
            <TextContainer
              text={t('searchAddressee:enterData')}
              typography="paragraph"
            />
            <Input
              name="search"
              control={control}
              error={errors.search?.message}
              autoFocus
              keyboardType="number-pad"
              rules={searchAccountRule}
              maxLength={18}
            />
          </Card>
        </Container>

        <Button
          label={t('global:search')}
          variant="black"
          marginVertical={32}
          onPress={handleSubmit(submit)}
          disabled={!search}
        />
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
  searchIllustrationStyle: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 32,
  },
});

export default SearchAddresseeScreen;
