import 'babel-polyfill';
import React                                    from 'react';
import { render }                               from 'react-dom';
import Root                                     from './containers/Root';
import { boot }                                 from './thunkActions/lifeCycle';
import configureStore                           from './store/configureStore';

import './styles/main.less';

// Create the application's data store
const store = configureStore();

if (__DEV__) {
  window.store = store;
}

store.dispatch(boot());

render(
  <Root store={store} />
  ,
  document.getElementById('redux-app')
);
