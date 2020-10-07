export const ADD_NEW_CHURCHES = 'ADD_NEW_CHURCHES';
export const CHANGE_MAP_MODE = 'CHANGE_MAP_MODE';
export const CHANGE_CHURCH_NAME = 'CHANGE_CHURCH_NAME';
export const CHANGE_PHONE_NUMBER = 'CHANGE_PHONE_NUMBER';
export const CHANGE_CHURCH_ADDRESS = 'CHANGE_CHURCH_ADDRESS';
export const CHANGE_CHURCH_URL = 'CHANGE_CHURCH_URL';
export const CHANGE_LATITUDE = 'CHANGE_LATITUDE';
export const CHANGE_LONGITUDE = 'CHANGE_LONGITUDE';
export const CHANGE_IS_ERROR = 'CHANGE_IS_ERROR';


export const setIsError = (value) => ({
  type: CHANGE_IS_ERROR,
  payload: value,
});

export const setLongitude = (lon) => ({
  type: CHANGE_LONGITUDE,
  payload: lon,
});

export const setLatitude = (lat) => ({
  type: CHANGE_LATITUDE,
  payload: lat,
});

export const setMode = (mode) => ({
  type: CHANGE_MAP_MODE,
  payload: mode,
});

export const addNewChurches = (churches) => ({
  type: ADD_NEW_CHURCHES,
  payload: churches,
});

export const setChurchName = (name) => ({
  type: CHANGE_CHURCH_NAME,
  payload: name,
})

export const setChurchPhone = (churchPhoneNumber) => ({
  type: CHANGE_PHONE_NUMBER,
  payload: churchPhoneNumber,
})

export const setChurchAddress = (address) => ({
  type: CHANGE_CHURCH_ADDRESS,
  payload: address,
})

export const setChurchUrl = (url) => ({
  type: CHANGE_CHURCH_URL,
  payload: url,
})
