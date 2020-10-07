import { combineReducers } from "redux";
import * as Actions from "./Actions";

const initialState = {
  isError: false,
  message: '',
  churches: [],
  latitude: 40.730610,
  longitude: -73.935242,
  churchName: '',
  churchPhoneNumber: '',
  churchAddress: '',
  churchUrl: '',
  mode: 'detailed',
};

export const appSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.CHANGE_IS_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    case Actions.CHANGE_MAP_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case Actions.CHANGE_LATITUDE:
      return {
        ...state,
        latitude: action.payload,
      };
    case Actions.CHANGE_LONGITUDE:
      return {
        ...state,
        longitude: action.payload,
      };
    case Actions.ADD_NEW_CHURCHES:
      return {
        ...state,
        churches: action.payload,
      };
    case Actions.CHANGE_CHURCH_NAME:
      return {
        ...state,
        churchName: action.payload,
      };
    case Actions.CHANGE_PHONE_NUMBER:
      return {
        ...state,
        churchPhoneNumber: action.payload,
      };
    case Actions.CHANGE_CHURCH_ADDRESS:
      return {
        ...state,
        churchAddress: action.payload,
      };
    case Actions.CHANGE_CHURCH_URL:
      return {
        ...state,
        churchUrl: action.payload,
      };
  }
  return state;
};

export default combineReducers({
  appSettings: appSettingsReducer,
});
