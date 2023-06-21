interface SetInitialState {
  type: 'SET_INITIAL_STATE',
  payload: AuthDataInterface;
}

interface SetEmail {
  type: 'SET_EMAIL';
  payload: string;
}

interface SetIsLoggedAction {
  type: 'SET_IS_LOGGED';
  payload: boolean;
}
interface SetIsRegisteredAction {
  type: 'SET_IS_PREREGISTERED';
  payload: boolean;
}

interface SetAuthDataAction {
  type: 'SET_PREREGISTERED_AUTH_DATA';
  payload: AuthDataInterface;
}

interface SetUpdateInfoPersonalDataAction {
  type: 'SET_UPDATE_INFO_PERSONAL_DATA';
  payload: AuthDataInterface;
}

interface SetUpdateInfoAddressDataAction {
  type: 'SET_UPDATE_INFO_ADDRESS_DATA';
  payload: AuthDataInterface
}

export interface AuthDataInterface {
  addressCity?: string;
  addressCountry?: string;
  addressExteriorNumber?: string;
  addressInteriorNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressState?: string;
  addressStreet?: string;
  addressSuburb?: string;
  addressZip?: string;
  birthState?: string;
  branchId?: string;
  curp?: string;
  dateOfBirth?: string;
  docNumber?: string;
  docType?: number;
  email?: string;
  gender?: number;
  isLogged?: boolean;
  isPreRegistered?: boolean;
  lastName?: string;
  leasedLine?: string;
  middleName?: string;
  mobilePhone?: string;
  msisdn?: string;
  name?: string;
  noticePrivacy?: boolean;
  password?: string;
  rfc?: string;
  secondLastName?: string;
  termsAndConditionsId?: string;
}

export type AuthActionTypes = SetInitialState | SetEmail | SetIsLoggedAction | SetIsRegisteredAction | SetAuthDataAction |
SetUpdateInfoPersonalDataAction | SetUpdateInfoAddressDataAction;
