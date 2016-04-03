import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import BouncingBall                     from '../../components/demos/BouncingBall';

function mapStateToProps(state) {
  return {};
}

class BouncingBallDemo extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'content'}>
        <h2>Bouncing Ball Demo</h2>
        <BouncingBall />
      </div>
    );
  }
}

export default connect(mapStateToProps)(BouncingBallDemo);
