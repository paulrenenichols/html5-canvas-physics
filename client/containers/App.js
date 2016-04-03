// core modules
import React, { Component }                         from 'react';
import { connect }                                  from 'react-redux';
import Immutable                                    from 'immutable';

import Footer                                       from '../components/Footer';
import Header                                       from '../components/Header';


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
    return (
      <div>
        <Header {...this.props} />
        <section className={'main'}>
          {this.props.children}
        </section>
        <Footer {...this.props}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
