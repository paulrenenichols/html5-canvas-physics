import React, { Component, PropTypes }  from 'react';

import SizeAwareContainer               from './SizeAwareContainer';
import ResizableCanvas                  from './ResizableCanvas';

class ResponsiveCanvas extends Component {

  static propTypes = {
    canvasDrawerFactory:  PropTypes.func,
    className:            PropTypes.string
  }

  static defaultProps = {
    className: 'responsive-canvas'
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
    return (
      <SizeAwareContainer className={this.props.className} onResize={this.onResize}>
        <ResizableCanvas {...this.state} />
      </SizeAwareContainer>
    );
  }
}

export default ResponsiveCanvas;
