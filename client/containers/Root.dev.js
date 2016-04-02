import React, { Component }             from 'react';
import { Provider }                     from 'react-redux';
import App                              from './App';

// Debugging imports for development test in browser console
import Immutable                        from 'immutable';
import _                                from 'lodash';
import moment                           from 'moment-timezone';
import API                              from '../api/index';
import Perf                             from 'react-addons-perf';
const  { buildReduxState }              = API.ReduxState;
window.Immutable                        = Immutable;
window.API                              = API;
window._                                = _;
window.moment                           = moment;
window.Perf                             = Perf;

import DevTools                         from './DevTools';

export default class Root extends Component {
  constructor(props) {
    super(props);

    // The Marketview Get State API is now
    // available on the browser window object
    // in development for testing.
    window.ReduxState = buildReduxState(props.store.getState);
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div style={ {width: '100%', height: '100%'} }>
          <App />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
