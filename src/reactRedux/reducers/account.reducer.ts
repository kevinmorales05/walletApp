import { act } from 'react-test-renderer';
import {
  AccountActionTypes,
  AccountInterface,
  SET_ACCOUNT,
  SET_INITIAL_STATE_ACCOUNT,
  AccountsInterface,
} from '../types';

const initialState2: AccountInterface = {
  accountId: '',
  status: false,
  statusUpdateDateTime: '',
  currency: '',
  accountType: '',
  accountSubType: '',
  nickname: '',
  openingDate: '',
  description: '',
  account: {},
};
const initialState: AccountsInterface = {
  accountholderId: '',
  data: [],
  messageType: 0,
  responseCode: '',
  responseMessage: '',
  responseSubject: '',
  transId: '',
};

export default function AccountsReducer(
  state: AccountsInterface = initialState,
  action: AccountActionTypes,
): AccountsInterface {
  switch (action.type) {
    case SET_INITIAL_STATE_ACCOUNT:
      return initialState;

    case SET_ACCOUNT:
      return {
        ...state,
        accountholderId: action.payload.accountholderId,
        data: action.payload.data,
        messageType: action.payload.messageType,
        responseCode: action.payload.responseCode,
        responseMessage: action.payload.responseMessage,
        responseSubject: action.payload.responseSubject,
        transId: action.payload.transId,
      };

    default:
      return state;
  }
}
