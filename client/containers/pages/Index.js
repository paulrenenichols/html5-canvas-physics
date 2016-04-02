import React, { Component, PropTypes } from 'react';
import { connect }                     from 'react-redux';

function mapStateToProps(state) {
  return {};
}

class Index extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'content'}>
        <h2>Index</h2>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Index);
