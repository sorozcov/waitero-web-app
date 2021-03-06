/* -------------------------------------------------------------------------- */
/*                         Acciones del reductor Auth                         */
/* -------------------------------------------------------------------------- */

import * as types from '../types/auth';


export const startLogin = ({username, password}) => ({
  type: types.AUTHENTICATION_STARTED,
  payload: { username, password },
});

export const completeLogin = token => ({
  type: types.AUTHENTICATION_COMPLETED,
  payload: { token },
});

export const failLogin = error => ({
  type: types.AUTHENTICATION_FAILED,
  payload: { error },
});

export const clearLoginError = () => ({
  type: types.AUTHENTICATION_FAILED_CLEAR,
});

export const logout = () => ({
  type: types.AUTHENTICATION_IDENTITY_CLEARED,
});

export const authenticationUserInformationStarted = () => ({
  type: types.AUTHENTICATION_USER_INFORMATION_STARTED,
});

export const authenticationUserInformationCompleted= (user) => ({
  type: types.AUTHENTICATION_USER_INFORMATION_COMPLETED,
  payload: { user },
});

export const startTokenRefresh = () => ({
  type: types.TOKEN_REFRESH_STARTED,
});

export const completeTokenRefresh = newToken => ({
  type: types.TOKEN_REFRESH_COMPLETED,
  payload: { newToken },
});

export const failTokenRefresh = error => ({
  type: types.TOKEN_REFRESH_FAILED,
  payload: { error },
});