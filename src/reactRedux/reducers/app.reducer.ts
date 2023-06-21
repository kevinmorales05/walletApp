import {
  AppActionTypes,
  AppInterface,
  SET_LANGUAGE,
  SET_ERROR,
  SET_INITIAL_STATE_APP
} from '../types';

const initialState: AppInterface = {
  language: undefined,
  error: undefined
};

export default function AppReducer(
  state: AppInterface = initialState,
  action: AppActionTypes
): AppInterface {
  switch (action.type) {
    case SET_INITIAL_STATE_APP:
      return initialState;

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.data
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.data
      };

    default: return state;
  }
}
