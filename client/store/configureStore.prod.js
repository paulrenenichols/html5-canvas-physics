import { createStore, applyMiddleware, compose }  from 'redux';
import { rootReducer }                            from '../reducers/index';
import reduxStateAndLogThunkMiddleware            from '../middleware/reduxStateAndLogThunkMiddleware';
import sequenceAction                             from 'redux-sequence-action';

const finalCreateStore = compose(
  applyMiddleware(sequenceAction, reduxStateAndLogThunkMiddleware)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
