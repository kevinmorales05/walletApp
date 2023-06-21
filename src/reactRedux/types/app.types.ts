export const SET_INITIAL_STATE_APP = 'SET_INITIAL_STATE_APP';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_ERROR = 'SET_ERROR';

export interface AppInterface {
  language?: string;
  error?: string;
}

interface SetLanguageAction {
  type: typeof SET_LANGUAGE;
  data: string;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  data?: string;
}

interface SetInitialStateAppAction {
  type: typeof SET_INITIAL_STATE_APP,
  data: AppInterface;
}

export type AppActionTypes = SetLanguageAction | SetErrorAction | SetInitialStateAppAction;
