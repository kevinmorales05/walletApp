import { RootState } from 'reactRedux/reducers';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AccountInterface } from './account.types';
import { AppInterface } from './app.types';
import { AuthDataInterface } from './auth.types';

export type ThunkActionType = ThunkAction<void, RootState, unknown, AnyAction>;

export type RootReducer = {
  app: AppInterface;
  auth: AuthDataInterface;
  account: AccountInterface;
}
