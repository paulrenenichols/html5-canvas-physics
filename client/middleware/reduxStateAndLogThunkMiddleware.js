import API                  from '../api/index';
const  { buildReduxState }  = API.ReduxState;
const  { buildLogger }      = API.Logger;


export default function reduxStateAndLogThunkMiddleware({ dispatch, getState }) {
  const reduxState = buildReduxState(getState);
  function logToConsolePredicate() {
    return reduxState.UserInterface.AppState.inAppStateServerDisconnected();
  }
  let logger = buildLogger(reduxState, logToConsolePredicate);
  return function reduxStateAndLogThunkMiddlewareNextClosure(next) {
    return function reduxStateAndLogThunkMiddlewareActionClosure(action) {
      return typeof action === 'function' ?
        action(dispatch, reduxState, logger) :
        next(action);
    }
  }
}
