import { loadConfig }                               from './config';
import { testConnectionAndStartHeartBeat }          from './heartBeat';
import { testForActiveSession,
         logout,
         shutdownAuthInterval }                     from './auth';
import { restoreUserSettings }                      from './userSettings';

// Actions
import Actions                                      from '../actions/index';
const  { uiSetAppState,
         uiLogout }                                 = Actions.UserInterface.Creators;

// API
import API                                          from '../api/index';
const  UIStates                                     = API.Const.UserInterface;

export function boot() {
  return function bootClosure(dispatch, reduxState, logger) {
    logger.info({
      message: 'boot()',
    });
    dispatch([
      testConnectionAndStartHeartBeat(),
      loadConfig(),
      testForActiveSession(),
      startApplication()
    ]);
  }
}

export function startApplication() {
  return function startApplicationClosure(dispatch, reduxState, logger) {
    logger.info({
      message: 'startApplication()',
    });
    if (reduxState.UserInterface.AppState.inAppStateActiveSession()) {
      dispatch([
        restoreUserSettings(),
        uiSetAppState(UIStates.UI_APP_STATE_LOGGED_IN)
      ]);
    }
  }
}

export function shutdownApplication() {
  return function shutdownApplicationClosure(dispatch, reduxState, logger) {
    logger.info({
      message: 'shutdownApplication()',
    });
    dispatch([
      uiSetAppState(UIStates.UI_APP_STATE_LOGGED_OUT),
      shutdownAuthInterval(),
      logout()
    ]);
  }
}

export function disconnectApplication() {
  return function disconnectApplicationClosure(dispatch, reduxState, logger) {
    logger.info({
      message: 'disconnectApplication()',
    });
    dispatch([[
      shutdownAuthInterval(),
      uiLogout(),
      uiSetAppState(UIStates.UI_APP_STATE_SERVER_DISCONNECTED)
    ]]);
  }
}
