import {TransactionType} from '../reactRedux';

export type CallbackType<T = any> = (success: boolean, args?: T) => void;
export type LoginCallbackType<T = any, S = any> = (
  success: boolean,
  args?: T,
  param?: S,
) => void;

export type ErrorType = 'invalid-format' | 'required' | 'not-match' | undefined;

export type StatusType = 'idle' | 'loading' | 'success' | 'failed';

export type PermissionsErrorType = 'unavailable' | 'blocked' | 'denied';

export type AuthStackParams = {
  Onboarding: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
  LoginUser: undefined;
};

export type HomeStackParams = {
  Home: undefined;
  MyAccount: undefined;
  MovementDetails: {movement: TransactionType};
  SendMoney: undefined;
  SearchAddressee: undefined;
  NewAddressee: {account: string};
  QrAmount: undefined;
  QrCode: {amount: number};
  UnderConstruction: undefined;
  QrReader: undefined;
  MakePayment: CodePayment;
  SuccessPayment: CodePayment;
};

export type DrawerParams = {
  HomeStack: undefined;
};

export type CodePayment = {
  accountId?: string;
  amount: string;
  identification: string;
};
