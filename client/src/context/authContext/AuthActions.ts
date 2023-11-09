import { FETCH_USER, LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from '../const';

export const fetchUser = (user: any) => ({
  type: FETCH_USER,
  payload: user,
});

// login
export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (user: any) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

// logout

export const logout = () => ({
  type: LOGOUT,
});
