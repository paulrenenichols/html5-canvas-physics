import React, { Component, PropTypes }  from 'react';
import ReactDOM                         from 'react-dom';

class ResizableCanvas extends Component {

  static propTypes = {
    width:    PropTypes.number,
    height:   PropTypes.number
  }

  static defaultProps = {
    width:    400,
    height:   400
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      canvas: ReactDOM.findDOMNode(this.refs.canvas)
    });
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas ref='canvas' width={`${width}`} height={`${height}`}></canvas>
    );
  }
}

export default ResizableCanvas;
