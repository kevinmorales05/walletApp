import {
  AppActionTypes,
  SET_LANGUAGE,
  SET_ERROR,
  SET_INITIAL_STATE_APP
} from '../types';

export const setInitialStateAppAction = (): AppActionTypes => ({
  type: SET_INITIAL_STATE_APP,
  data: {}
});

export const setLanguage = (data: string): AppActionTypes => ({
  type: SET_LANGUAGE,
  data
});

export const setErrorAction = (data: string | undefined): AppActionTypes => ({
  type: SET_ERROR,
  data
});
