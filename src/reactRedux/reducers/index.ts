import {RootReducer} from '../../reactRedux/types/redux.types';

import {combineReducers} from 'redux';
import AccountsReducer from './account.reducer';
import AppReducer from './app.reducer';
import AuthReducer from './auth.reducer';

export const rootReducer = combineReducers<RootReducer>({
  app: AppReducer,
  auth: AuthReducer,
  account: AccountsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
