/* eslint-disable no-param-reassign */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OtpModal, SafeArea} from '../../../components';
import React, {useRef, useState} from 'react';
import PagerView from 'react-native-pager-view';
import {useSelector, useDispatch} from 'react-redux';
import {
  AuthDataInterface,
  preSignUpAction,
  setAuthDataAction,
  setIsPreRegisteredAction,
  updateInfoAction,
  otpValidateAction,
  setUpdateInfoPersonalDataAction,
  setUpdateInfoAddressDataAction,
  RootState,
  loginAction,
  sendOtpAction,
  getZipCodeInfo,
  setInitialState,
} from '../../../reactRedux';
import {useAlert, useLoading} from '../../../context';
import {ZipCodeInfoResponse} from '../../../services';
import {useTranslation} from 'react-i18next';
import OnboardingScreen from './OnboardingScreen';

const initialZipCodeInfoState: ZipCodeInfoResponse = {
  zipCode: '',
  colonies: [],
  municipality: '',
  state: '',
};

const OnboardingController: React.FC = () => {
  const {t} = useTranslation();
  const userAuth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const {navigate} = useNavigation<NativeStackNavigationProp<any>>();
  const alert = useAlert();
  const loader = useLoading();

  const pagerViewRef = useRef<PagerView>(null);

  const [otpModalVisible, setOtpModalVisible] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<string | undefined>('');
  const [selectedPhone, setSelectedPhone] = useState<string | undefined>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zipCodeInfo, setZipCodeInfo] = useState<ZipCodeInfoResponse>(
    initialZipCodeInfoState,
  );

  const preSignup = (user: AuthDataInterface) => {
    //loader.show();
    setSelectedEmail(user.email);
    try {
      dispatch(
        preSignUpAction(user, (success, data) => {
          //const {responseCode} = data;
          if (success && data) {
            dispatch(setAuthDataAction(user));
            dispatch(setIsPreRegisteredAction(true));

            // if (responseCode === '0' || responseCode === '100') {
            //   dispatch(
            //     loginAction(user, (successLogin, dataLogin) => {
            //       // It's necessary a login (/token, grant:password)
            //       if (successLogin && dataLogin) {
            //         dispatch(
            //           sendOtpAction(1, (successSendedOtp, dataSendedOtp) => {
            //             loader.hide();
            //             const {responseCode: responseOtpCode} =
            //               dataSendedOtp.data;

            //             if (successSendedOtp && dataSendedOtp) {
            //               if (responseOtpCode === '0') {
            //                 setOtpModalVisible(true);
            //               } else if (responseOtpCode === '115') {
            //                 alert.show({
            //                   title: t('signUp:otpLimitExceeded'),
            //                 });
            //               } else {
            //                 alert.show({
            //                   title: t('signUp:otpSendError'),
            //                 });
            //               }
            //             }
            //           }),
            //         );
            //       }
            //     }),
            //   );
            // }
          }
          else {
            dispatch(setAuthDataAction(user));
            dispatch(setIsPreRegisteredAction(true));
          }
        }),
      );
    } catch (error) {
      console.error('Unknow Error', error);
    }
  };

  const updateInfo = (user: AuthDataInterface) => {
    loader.show();
    setSelectedEmail('');
    setSelectedPhone(user.mobilePhone);

    dispatch(
      loginAction(userAuth, (successLogin, dataLogin) => {
        // It's necessary a login (/token, grant:password)
        if (successLogin && dataLogin) {
          user.email = userAuth.email;
          user = {
            name: user.name,
            middleName: ' ',
            lastName: user.lastName,
            secondLastName: user.secondLastName,
            dateOfBirth: '1989-05-18',
            msisdn: user.mobilePhone,
            addressLine1: 'Line 1 test 55',
            addressLine2: 'Line 2 test 55',
            addressCity: 'Toluquita',
            addressState: '19',
            addressZip: '87030',
            addressCountry: '404',
            mobilePhone: user.mobilePhone,
            leasedLine: '1010101010',
            rfc: user.rfc,
            docType: 1,
            birthState: '19',
            gender: user.gender,
            docNumber: '12',
          };
          dispatch(
            updateInfoAction(user, (success, data) => {
              loader.hide();
              if (success && data) {
                dispatch(setUpdateInfoPersonalDataAction(user));
                setOtpModalVisible(true);
              }
            }),
          );
        }
      }),
    );
  };

  const updateInfoAddress = (user: AuthDataInterface) => {
    loader.show();
    user.email = userAuth.email;
    user.mobilePhone = userAuth.mobilePhone;
    user.name = userAuth.name;
    user.middleName = userAuth.middleName;
    user.lastName = userAuth.lastName;
    user.secondLastName = userAuth.secondLastName;
    user.dateOfBirth = userAuth.dateOfBirth;
    user.msisdn = userAuth.msisdn;
    user.rfc = userAuth.rfc;
    user.gender = userAuth.gender;
    user.curp = userAuth.curp;
    user.addressLine1 = '';
    user.addressLine2 = '';
    user.addressCountry = '404';
    user.leasedLine = '1010101010';
    user.docType = 1;
    user.birthState = '19';
    user.docNumber = '12';

    dispatch(
      updateInfoAction(user, (success, data) => {
        loader.hide();
        if (success && data) {
          dispatch(setUpdateInfoAddressDataAction(user));
          pagerViewRef?.current?.setPage(currentIndex + 1);
        }
      }),
    );
  };

  const onChangeZipCode = (zipCode: string) => {
    if (zipCode?.length >= 5) {
      dispatch(
        getZipCodeInfo(zipCode, (success, data) => {
          if (success && data) setZipCodeInfo(data);
          else setZipCodeInfo(initialZipCodeInfoState);
        }),
      );
    } else setZipCodeInfo(initialZipCodeInfoState);
  };
  /**
   *
   * @param otp Submit method to Validate Modal OTP.
   */
  const submit = (otp: number) => {
    loader.show();
    setOtpModalVisible(false);
    dispatch(
      otpValidateAction(otp, (success, data) => {
        const {responseCode} = data.data;
        loader.hide();
        if (success && data) {
          if (responseCode === '0') {
            pagerViewRef.current?.setPage(currentIndex + 1);
          } else if (responseCode === '102') {
            alert.show({
              title: t('otpModal:otpInvalid'),
            });
          } else {
            alert.show({
              title: t('otpModal:errorValidatingOtp'),
            });
          }
        }
      }),
    );
  };

  return (
    <SafeArea bottomSafeArea={false}>
      <OnboardingScreen
        ref={pagerViewRef}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        onSubmitPreSignup={(email, password) => {
          const user = {email, password} as AuthDataInterface;
          preSignup(user);
        }}
        onSubmitPersonalData={(
          name,
          lastName,
          secondLastName,
          gender,
          mobilePhone,
          curp,
          rfc,
        ) => {
          const user = {
            name,
            lastName,
            secondLastName,
            gender,
            mobilePhone,
            curp,
            rfc,
          } as AuthDataInterface;
          updateInfo(user);
        }}
        onSubmitAddressData={(
          addressStreet,
          addressInteriorNumber,
          addressExteriorNumber,
          addressZip,
          addressState,
          addressCity,
          addressSuburb,
          noticePrivacy,
        ) => {
          const user = {
            addressStreet,
            addressInteriorNumber,
            addressExteriorNumber,
            addressZip,
            addressState,
            addressCity,
            addressSuburb,
            noticePrivacy,
          } as AuthDataInterface;
          updateInfoAddress(user);
        }}
        onSubmitNipForm={() => {
          navigate('Welcome');
        }}
        onPressBack={() => pagerViewRef?.current?.setPage(currentIndex - 1)}
        onChangeZipCode={onChangeZipCode}
        zipCodeInfo={zipCodeInfo}
        onLogin={() => {
          dispatch(setInitialState());
          navigate('LoginUser');
        }}
      />
      <OtpModal
        visible={otpModalVisible}
        email={selectedEmail}
        phone={selectedPhone}
        onCancel={() => setOtpModalVisible(false)}
        onSubmit={submit}
      />
    </SafeArea>
  );
};

export default OnboardingController;
