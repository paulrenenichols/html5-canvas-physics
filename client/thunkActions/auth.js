import _                          from 'lodash';

// Actions
import Actions                    from '../actions/index';
const  { uiLoginTry,
         uiLoginSuccess,
         uiLoginFail,
         uiLogout,
         uiSetAppState}           = Actions.UserInterface.Creators;

// API
import API                        from '../api/index';
const  { fetchLoginAuth,
         fetchLoginActive,
         fetchLogout }            = API.Http.Auth;
const  UIStates                   = API.Const.UserInterface;

var authExpirationIntervalID;

export function shutdownAuthInterval() {
  return function shutdownAuthIntervalClosure() {
    clearInterval(authExpirationIntervalID);
    authExpirationIntervalID = null;
  }
}

export function login(username, password) {
  return function loginClosure(dispatch, reduxState, logger) {

    logger.info({
      message: 'login()'
    });
    dispatch(uiLoginTry());

    if (!_.isString(username) || (username.length === 0) || !_.isString(password) || (password.length === 0)) {
      return Promise.resolve({}).then(function () {
        dispatch(uiLoginFail());
      });
    }

    if (authExpirationIntervalID) {
      clearInterval(authExpirationIntervalID);
      authExpirationIntervalID = null;
    }

    logger.info({
      message: 'login(), have arguments, attempting authentication'
    });
    return fetchLoginAuth(username, password).then(
      function onFulFillment(result) {
        if (result.loggedIn) {
          logger.info({
            message: 'login() onFulFillment(), have arguments, uiLoginSuccess'
          });
          dispatch(uiSetAppState(UIStates.UI_APP_STATE_ACTIVE_SESSION));
          dispatch(uiLoginSuccess(result.user));

          authExpirationIntervalID = setInterval(function () {
            fetchLoginActive().then(
              function onFulFillment(result) {
                if (!result.loggedIn) {
                  dispatch(uiLogout());
                  clearInterval(authExpirationIntervalID);
                  authExpirationIntervalID = null;
                }
              }
            );
          }, 120 * 1000);
        }
        else {
          logger.info({
            message: 'login() onFulFillment(), uiLoginFail'
          });
          dispatch(uiLoginFail());
        }
        return result;
      },
      function onRejection(reason) {
        logger.error({
          message: 'login() onRejection(), uiLoginFail',
          onFulFillment
        });
      }
    );
  }
}

export function testForActiveSession() {
  return function testForActiveSessionClosure(dispatch, reduxState, logger) {
    logger.info({
      message: 'testForActiveSession()'
    });
    return fetchLoginActive().then(
      function onFulFillment(result) {
        logger.info({
          message: 'testForActiveSession() onFulFillment() checking for session'
        });
        if (result.loggedIn) {
          logger.info({
            message: 'testForActiveSession() onFulFillment() active session found'
          });
          dispatch(uiSetAppState(UIStates.UI_APP_STATE_ACTIVE_SESSION));
          dispatch(uiActiveSession(result.user));
        }
        else {
          logger.info({
            message: 'testForActiveSession() onFulFillment() no session, setting state to logged out'
          });
          dispatch(uiSetAppState(UIStates.UI_APP_STATE_LOGGED_OUT));
        }
      },
      function onRejection(reason) {
        logger.error({
          message: 'testForActiveSession()',
          reason
        });
      }
    );
  }
}

export function logout() {
  return function logoutClosure(dispatch, reduxState, logger) {
    logger.info({
      message: 'logout()'
    });
    return fetchLogout().then(
      function onFulFillment(result) {
        dispatch(uiLogout());
        logger.info({
          message: 'logout() onFulFillment()'
        });
      },
      function onRejection(reason) {
        logger.error({
          message: 'logout() onRejection()',
          reason
        });
      }
    );
  }
}
