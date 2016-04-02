import React, { Component }             from 'react';
import { Provider }                     from 'react-redux';
import App                              from './App';
import routes                           from '../routes';
import { Router}                        from 'react-router';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div style={ {width: '100%', height: '100%'} }>
          <Router onUpdate={() => window.scrollTo(0, 0)} history={store.browserHistory} routes={routes} />
        </div>
      </Provider>
    );
  }
}
