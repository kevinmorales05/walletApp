import {ARROW_LEFT_GRAY_ICON, LOGO} from '../../../assets/images';
import {
  Container,
  SignUpForm,
  Stepper,
  Touchable,
  PersonalDataForm,
  AddressDataForm,
} from '../../../components';
import {NipForm} from '../../../components/organisms/NipForm';
import React, {ForwardedRef, forwardRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {ZipCodeInfoResponse} from '../../../services';

interface Props {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onSubmitPreSignup: (email: string, password: string) => void;
  onSubmitPersonalData: (
    name: string,
    lastName: string,
    secondLastName: string,
    gender: number,
    mobilePhone: string,
    curp: string,
    rfc: string,
  ) => void;
  onSubmitAddressData: (
    addressStreet: string,
    addressInteriorNumber: string,
    addressExteriorNumber: string,
    addressZip: string,
    addressState: string,
    addressCity: string,
    addressSuburb: string,
    noticePrivacy: boolean,
  ) => void;
  onSubmitNipForm: (nip: string, confirmNip: string) => void;
  onPressBack: () => void;
  onChangeZipCode: (zipCode: string) => void;
  zipCodeInfo: ZipCodeInfoResponse;
  onLogin: () => void;
}

const OnboardingScreen = forwardRef(
  (
    {
      currentIndex,
      setCurrentIndex,
      onSubmitPreSignup,
      onSubmitPersonalData,
      onSubmitAddressData,
      onSubmitNipForm,
      onPressBack,
      onChangeZipCode,
      zipCodeInfo,
      onLogin,
    }: Props,
    ref: ForwardedRef<PagerView>,
  ) => {
    const {arrowStyle, logoStyle, arrowContainer} = styles;

    return (
      <Container flex>
        <Image source={LOGO} style={logoStyle} resizeMode="contain" />
        {currentIndex > 0 && (
          <Container style={arrowContainer}>
            <Touchable onPress={onPressBack} rounded>
              <Image
                source={ARROW_LEFT_GRAY_ICON}
                style={arrowStyle}
                resizeMode="contain"
              />
            </Touchable>
          </Container>
        )}

        <Container style={{marginTop: 20, paddingTop: 64}}>
          <Stepper
            totalSteps={4}
            currentStep={currentIndex + 1}
            marginVertical={30}
          />
        </Container>

        <PagerView
          ref={ref}
          style={{flex: 1}}
          initialPage={0}
          onPageSelected={({nativeEvent: {position}}) =>
            setCurrentIndex(position)
          }
          keyboardDismissMode="on-drag"
          scrollEnabled={false}>
          <View key="p1">
            <SignUpForm onSubmit={onSubmitPreSignup} onLogin={onLogin} />
          </View>
          <View key="p2">
            <PersonalDataForm
              onSubmit={onSubmitPersonalData}
              onPressBack={onPressBack}
            />
          </View>
          <View key="p3">
            <AddressDataForm
              onSubmit={onSubmitAddressData}
              onPressBack={onPressBack}
              onChangeZipCode={onChangeZipCode}
              zipCodeInfo={zipCodeInfo}
            />
          </View>
          <View key="p4">
            <NipForm onSubmit={onSubmitNipForm} onPressBack={onPressBack} />
          </View>
        </PagerView>
      </Container>
    );
  },
);

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
  logoStyle: {
    width: 150,
    height: 50,
    position: 'absolute',
    alignSelf: 'center',
    top: 8,
  },
});

export default OnboardingScreen;
