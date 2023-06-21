import {
  AccountActionTypes,
  AccountInterface,
  SET_ACCOUNT,
  SET_INITIAL_STATE_ACCOUNT
} from '../types';

const initialState: AccountInterface = {
  accountId: '',
  status: false,
  statusUpdateDateTime: '',
  currency: '',
  accountType: '',
  accountSubType: '',
  nickname: '',
  openingDate: '',
  description: '',
  account: {}
};

export default function AccountsReducer(
  state: AccountInterface = initialState,
  action: AccountActionTypes
): AccountInterface {
  switch (action.type) {
    case SET_INITIAL_STATE_ACCOUNT:
      return initialState;

    case SET_ACCOUNT:
      return {
        ...state,
        accountId: action.payload.accountId,
        status: action.payload.status,
        statusUpdateDateTime: action.payload.statusUpdateDateTime,
        currency: action.payload.currency,
        accountType: action.payload.accountType,
        accountSubType: action.payload.accountSubType,
        nickname: action.payload.nickname,
        openingDate: action.payload.openingDate,
        description: action.payload.description,
        account: action.payload.account
      };

    default: return state;
  }
}
