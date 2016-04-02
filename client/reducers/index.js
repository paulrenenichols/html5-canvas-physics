import { combineReducers }  from 'redux-immutablejs';
import auth                 from './auth';
import config               from './config';
import userInterface        from './userInterface';
import { routeReducer }     from '../router/react-router-redux-immutable';

export const rootReducer = combineReducers({
  auth,
  config,
  userInterface,
  routeReducer,
  routing: routeReducer
});
