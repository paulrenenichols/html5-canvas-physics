import { combineReducers }  from 'redux-immutablejs';
import auth                 from './auth';
import config               from './config';
import userInterface        from './userInterface';

export const rootReducer = combineReducers({
  auth,
  config,
  userInterface
});
