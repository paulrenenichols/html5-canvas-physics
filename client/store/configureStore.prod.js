import { createStore, applyMiddleware, compose }  from 'redux';
import { rootReducer }                            from '../reducers/index';
import reduxStateAndLogThunkMiddleware            from '../middleware/reduxStateAndLogThunkMiddleware';
import sequenceAction                             from 'redux-sequence-action';
import { syncHistory }                            from '../router/react-router-redux-immutable';
import { browserHistory }                         from 'react-router';

const reduxRouterMiddleware = syncHistory(browserHistory);

const enhancer = compose(
  applyMiddleware(sequenceAction, reduxStateAndLogThunkMiddleware, reduxRouterMiddleware)
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  reduxRouterMiddleware.listenForReplays(store);

  store.browserHistory = browserHistory;

  return store;
};
