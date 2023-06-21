import { AuthActionTypes, AuthDataInterface } from '../types';

const initialState: AuthDataInterface = {
  addressCity: '',
  addressCountry: '',
  addressExteriorNumber: '',
  addressInteriorNumber: '',
  addressLine1: '',
  addressLine2: '',
  addressState: '',
  addressStreet: '',
  addressSuburb: '',
  addressZip: '',
  birthState: '',
  branchId: '',
  curp: '',
  dateOfBirth: '',
  docNumber: '',
  docType: 0,
  email: '',
  gender: 0,
  isLogged: false,
  isPreRegistered: false,
  lastName: '',
  leasedLine: '',
  middleName: '',
  mobilePhone: '',
  msisdn: '',
  name: '',
  noticePrivacy: false,
  password: '',
  rfc: '',
  secondLastName: '',
  termsAndConditionsId: ''
};

export default function AuthReducer(
  state: AuthDataInterface = initialState,
  action: AuthActionTypes
): AuthDataInterface {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return initialState;

    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload
      };

    case 'SET_IS_LOGGED':
      return {
        ...state,
        isLogged: action.payload
      };

    case 'SET_PREREGISTERED_AUTH_DATA':
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password
      };

    case 'SET_IS_PREREGISTERED':
      return {
        ...state,
        isPreRegistered: action.payload
      };

    case 'SET_UPDATE_INFO_PERSONAL_DATA':
      return {
        ...state,
        name: action.payload.name,
        lastName: action.payload.lastName,
        secondLastName: action.payload.secondLastName,
        gender: action.payload.gender,
        mobilePhone: action.payload.mobilePhone,
        curp: action.payload.curp,
        rfc: action.payload.rfc
      };

    case 'SET_UPDATE_INFO_ADDRESS_DATA':
      return {
        ...state,
        addressStreet: action.payload.addressStreet,
        addressInteriorNumber: action.payload.addressInteriorNumber,
        addressExteriorNumber: action.payload.addressExteriorNumber,
        addressZip: action.payload.addressZip,
        addressState: action.payload.addressState,
        addressCity: action.payload.addressCity,
        addressSuburb: action.payload.addressSuburb,
        noticePrivacy: action.payload.noticePrivacy,
        addressCountry: action.payload.addressCountry,
        addressLine1: action.payload.addressLine1,
        addressLine2: action.payload.addressLine2,
        birthState: action.payload.birthState,
        branchId: action.payload.branchId,
        dateOfBirth: action.payload.dateOfBirth,
        docNumber: action.payload.docNumber,
        docType: action.payload.docType,
        leasedLine: action.payload.leasedLine,
        middleName: action.payload.middleName,
        msisdn: action.payload.msisdn,
        password: action.payload.password,
        termsAndConditionsId: action.payload.termsAndConditionsId
      };

    default:
      return state;
  }
}
