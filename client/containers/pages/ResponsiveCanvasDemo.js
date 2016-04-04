import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import ResponsiveCanvas                 from '../../components/ResponsiveCanvas';

function mapStateToProps(state) {
  return {};
}

class ResponsiveCanvasDemo extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'content responsive-canvas-demo'}>
        <h2>Responsive Canvas Demo</h2>
        <ResponsiveCanvas parent={this.refs.canvasContainer}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ResponsiveCanvasDemo);
