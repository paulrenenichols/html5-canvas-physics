import React, { Component, PropTypes }  from 'react';
import ReactDOM                         from 'react-dom';

class SizeAwareContainer extends Component {

  static propTypes = {
    onResize:  PropTypes.func,
    className: PropTypes.string
  }

  static defaultProps = {
    onResize: () => true,
    className: 'size-aware-container'
  }

  state = {
    height: 0,
    width: 0
  }

  constructor(props) {
    super(props);
  }

  updateSize() {
    let container   = ReactDOM.findDOMNode(this);
    let width       = container.clientWidth;
    let height      = container.clientHeight;
    this.props.onResize(width, height);
    this.setState({ width, height });
  }

  handleResize = () => {
    this.updateSize();
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default SizeAwareContainer;
