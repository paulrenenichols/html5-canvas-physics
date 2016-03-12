import React, { Component }             from 'react';
import { Provider }                     from 'react-redux';
import App                              from './App';

// Debugging imports for development test in browser console
import Immutable                        from 'immutable';
import _                                from 'lodash';
import moment                           from 'moment';
import API                              from '../api/index';
import Perf                             from 'react-addons-perf';
const  { buildReduxState }                = API.ReduxState;
window.Immutable                        = Immutable;
window.API                              = API;
window._                                = _;
window.moment                           = moment;
window.Perf                             = Perf;

// These are just for debugging, and they are unused in production.
import { DevTools, DebugPanel, LogMonitor }       from 'redux-devtools/lib/react';

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
          <DebugPanel top left bottom>
            <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
          </DebugPanel>
        </div>
      </Provider>
    );
  }
}
