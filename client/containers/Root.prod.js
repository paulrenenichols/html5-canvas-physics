import React, { Component }       from 'react';
import { Provider }               from 'react-redux';
import App                        from './App';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div style={ {width: '100%', height: '100%'} }>
          <App />
        </div>
      </Provider>
    );
  }
}
