import API                  from '../api/index';
const  { buildReduxState }  = API.ReduxState;
const  { buildLogger }      = API.Logger;

export default function reduxActionLoggingMiddleware({ dispatch, getState }) {
  const reduxState = buildReduxState(getState);
  function logToConsolePredicate() {
    return reduxState.UserInterface.NetworkState.networkIsDisconnected();
  }
  let logger = buildLogger(reduxState, logToConsolePredicate);
  return function reduxActionLoggingMiddlewareNextClosure(next) {
    return function reduxActionLoggingMiddlewareActionClosure(action) {
      if ((typeof action === 'object') && !(Array.isArray(action))) {
        logger.info({
          message: 'Action Logger',
          actionType: action.type
        });
      }
      return next(action);
    }
  }
}
