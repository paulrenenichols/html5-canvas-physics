import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import { Link }                         from 'react-router';

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
      <div className={'content demo-list'}>
        <h2>Demos</h2>
        <ul>
          <li><Link to={'bouncing-ball'}>Bouncing Ball Demo</Link></li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Index);
