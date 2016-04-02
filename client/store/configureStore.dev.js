import { createStore, applyMiddleware, compose }  from 'redux';
import { rootReducer }                            from '../reducers/index';
import reduxStateAndLogThunkMiddleware            from '../middleware/reduxStateAndLogThunkMiddleware';
import reduxActionLoggingMiddleware               from '../middleware/reduxActionLoggingMiddleware';
import sequenceAction                             from 'redux-sequence-action';

import DevTools                                   from '../containers/DevTools';

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(sequenceAction, reduxStateAndLogThunkMiddleware, reduxActionLoggingMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
};
