import 'babel-core/polyfill';
import React                                    from 'react';
import { render }                               from 'react-dom';
import Root                                     from './containers/Root';
import { testConnectionAndStartHeartBeat }      from './thunkActions/heartBeat';
import configureStore                           from './store/configureStore';

import './styles/main.less';

// Create the application's data store
const store = configureStore();

if (__DEV__) {
  window.store = store;
}

store.dispatch(testConnectionAndStartHeartBeat());

render(
  <Root store={store} />
  ,
  document.getElementById('redux-app')
);
