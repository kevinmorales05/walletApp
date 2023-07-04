export const SET_INITIAL_STATE_ACCOUNT = 'SET_INITIAL_STATE_ACCOUNT';
export const SET_ACCOUNT = 'SET_ACCOUNT';

export type TransactionType = {
  id: string;
  status: boolean;
  date: Date;
  amount: number;
  type: string;
};

interface SetInitialStateAccountAction {
  type: typeof SET_INITIAL_STATE_ACCOUNT;
  payload: AccountsInterface;
}

interface SetAccountAction {
  type: typeof SET_ACCOUNT;
  payload: AccountsInterface;
}

export interface AccountInterface {
  accountId?: string;
  status?: boolean;
  statusUpdateDateTime?: string;
  currency?: string;
  accountType?: string;
  accountSubType?: string;
  nickname?: string;
  openingDate?: string;
  description?: string;
  account?: {
    accountHolderId?: string;
    identification?: string;
    name?: string;
    secondaryIdentification?: string;
  };
}
export interface AccountsInterface {
  accountholderId: string;
  data: any[];
  messageType: number;
  responseCode: string;
  responseMessage: string;
  responseSubject: string;
  transId: string;
}

export type AccountActionTypes =
  | SetInitialStateAccountAction
  | SetAccountAction;
