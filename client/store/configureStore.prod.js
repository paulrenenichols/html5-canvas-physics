import { createStore, applyMiddleware, compose }  from 'redux';
import { rootReducer }                            from '../reducers/index';
import reduxStateAndLogThunkMiddleware            from '../middleware/reduxStateAndLogThunkMiddleware';
import sequenceAction                             from 'redux-sequence-action';

const enhancer = compose(
  applyMiddleware(sequenceAction, reduxStateAndLogThunkMiddleware)
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
};
