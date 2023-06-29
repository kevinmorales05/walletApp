import {AuthActionTypes, AuthDataInterface} from '../../reactRedux/types';
import {authServices} from '../../services';
import {CallbackType} from '../../utils';

export const setInitialState = (): AuthActionTypes => ({
  type: 'SET_INITIAL_STATE',
  payload: {},
});

export const setEmailAction = (data: string): AuthActionTypes => ({
  type: 'SET_EMAIL',
  payload: data,
});

export const setIsLogged = (data: boolean): AuthActionTypes => ({
  type: 'SET_IS_LOGGED',
  payload: data,
});
export const setAuthToken = (data: string): AuthActionTypes => ({
  type: 'SET_TOKEN',
  payload: data,
});

export const setIsPreRegisteredAction = (data: boolean): AuthActionTypes => ({
  type: 'SET_IS_PREREGISTERED',
  payload: data,
});

export const setAuthDataAction = (
  data: AuthDataInterface,
): AuthActionTypes => ({
  type: 'SET_PREREGISTERED_AUTH_DATA',
  payload: data,
});

export const setUpdateInfoPersonalDataAction = (
  data: AuthDataInterface,
): AuthActionTypes => ({
  type: 'SET_UPDATE_INFO_PERSONAL_DATA',
  payload: data,
});

export const setUpdateInfoAddressDataAction = (
  data: AuthDataInterface,
): AuthActionTypes => ({
  type: 'SET_UPDATE_INFO_ADDRESS_DATA',
  payload: data,
});

export function preSignUpAction(
  user: AuthDataInterface,
  callback: CallbackType<any>,
) {
  return async () => {
    try {
      const response = await authServices.preSignUp(user);
      callback(true, response);
    } catch (error: any) {
      callback(false, error);
    }
  };
}

export function otpValidateAction(otp: number, callback: CallbackType<any>) {
  return async () => {
    try {
      const response = await authServices.otpValidate(otp);
      callback(true, response);
    } catch (error: any) {
      callback(false, error);
    }
  };
}

export function updateInfoAction(
  user: AuthDataInterface,
  callback: CallbackType<any>,
) {
  return async () => {
    try {
      const response = await authServices.updateInfo(user);
      callback(true, response);
    } catch (error: any) {
      callback(false, error);
    }
  };
}

export function loginAction(
  user: AuthDataInterface,
  callback: CallbackType<any>,
) {
  return async () => {
    try {
      const response = await authServices.login(user);
      callback(true, response);
    } catch (error: any) {
      callback(false, error);
    }
  };
}

export function sendOtpAction(channel: number, callback: CallbackType<any>) {
  return async () => {
    try {
      const response = await authServices.sendOtp(channel);
      callback(true, response);
    } catch (error: any) {
      callback(false, error);
    }
  };
}
