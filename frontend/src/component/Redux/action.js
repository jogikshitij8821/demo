export const SET_MONGODB_DATA = 'SET_MONGODB_DATA';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const GOOGLE_DATA = "GOOGLE_DATA";

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}


export function setMongoDBData(user) {
  return {
    type: SET_MONGODB_DATA,
    payload: user,
  };
}

export function setGoogleData(user) {
  return {
    type: GOOGLE_DATA,
    payload: user,
  };
}