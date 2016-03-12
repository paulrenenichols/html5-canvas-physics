// core modules
import React, { Component }                         from 'react';
import { connect }                                  from 'react-redux';
import Immutable                                    from 'immutable';


function mapStateToProps(state) {
  return {
    userInterface:  state.get('userInterface'),
    auth:           state.get('auth')
  };
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    let appState = this.props.userInterface.get('appState');
    return (
      <div>
        <h1>Hello</h1>
        <p>{appState}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
