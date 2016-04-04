import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import SizeAwareContainer               from '../../components/SizeAwareContainer';

function mapStateToProps(state) {
  return {};
}

class SizeAwareContainerDemo extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  state = {
    width: 0,
    height: 0
  }

  constructor(props) {
    super(props);
  }

  onResize = (width, height) => {
    this.setState({ width, height });
  }

  render() {
    const { width, height } = this.state;
    return (
      <div className={'content size-aware-container-demo'}>
        <h2>SizeAwareContainer Demo</h2>
        <SizeAwareContainer onResize={this.onResize}>
          <p>{`width  ${width}`}</p>
          <p>{`height ${height}`}</p>
        </SizeAwareContainer>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SizeAwareContainerDemo);
