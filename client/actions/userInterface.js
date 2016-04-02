export const UI_LOGIN_TRY = 'UI_LOGIN_TRY';
export function uiLoginTry() {
  return {
    type: UI_LOGIN_TRY
  }
}

export const UI_LOGIN_SUCCESS = 'UI_LOGIN_SUCCESS';
export function uiLoginSuccess(user) {
  return {
    type: UI_LOGIN_SUCCESS,
    user
  }
}

export const UI_LOGIN_FAIL = 'UI_LOGIN_FAIL';
export function uiLoginFail() {
  return {
    type: UI_LOGIN_FAIL
  }
}

export const UI_LOGOUT = 'UI_LOGOUT';
export function uiLogout() {
  return {
    type: UI_LOGOUT
  }
}


export const UI_SET_APP_STATE = 'UI_SET_APP_STATE';
export function uiSetAppState(appState) {
  return {
    type: UI_SET_APP_STATE,
    appState
  }
}

export const UI_SET_NETWORK_STATE = 'UI_SET_NETWORK_STATE';
export function uiSetNetworkState(networkState) {
  return {
    type: UI_SET_NETWORK_STATE,
    networkState
  }
}
