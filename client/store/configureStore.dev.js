import { createStore, applyMiddleware, compose }  from 'redux';
import { rootReducer }                            from '../reducers/index';
import reduxStateAndLogThunkMiddleware            from '../middleware/reduxStateAndLogThunkMiddleware';
import reduxActionLoggingMiddleware               from '../middleware/reduxActionLoggingMiddleware';
import sequenceAction                             from 'redux-sequence-action';
import { syncHistory }                            from '../router/react-router-redux-immutable';
import { browserHistory }                         from 'react-router';
import DevTools                                   from '../containers/DevTools';

const reduxRouterMiddleware = syncHistory(browserHistory);

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(sequenceAction, reduxStateAndLogThunkMiddleware, reduxRouterMiddleware, reduxActionLoggingMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  reduxRouterMiddleware.listenForReplays(store);

  store.browserHistory = browserHistory;

  return store;
};
