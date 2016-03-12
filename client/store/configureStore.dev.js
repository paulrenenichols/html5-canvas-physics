import { createStore, applyMiddleware, compose }  from 'redux';
import { rootReducer }                            from '../reducers/index';
import reduxStateAndLogThunkMiddleware            from '../middleware/reduxStateAndLogThunkMiddleware';
import reduxActionLoggingMiddleware               from '../middleware/reduxActionLoggingMiddleware';
import sequenceAction                             from 'redux-sequence-action';

// These are just for debugging, and they are unused in production.
import { devTools, persistState }                 from 'redux-devtools';

const finalCreateStore = compose(
  applyMiddleware(sequenceAction, reduxStateAndLogThunkMiddleware, reduxActionLoggingMiddleware),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
