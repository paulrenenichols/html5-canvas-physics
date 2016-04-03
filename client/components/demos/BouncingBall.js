import React, { Component, PropTypes }  from 'react';
import ReactDOM                         from 'react-dom';

class BouncingBall extends Component {

  static propTypes = {
    radius: PropTypes.number,
    g:      PropTypes.number,
    color:  PropTypes.string,
    x:      PropTypes.number,
    y:      PropTypes.number,
    vx:     PropTypes.number,
    vy:     PropTypes.number
  }

  static defaultProps = {
    radius:   20,
    color:    '#0000ff',
    g:        0.1,  // acceleration due to gravity,
    x:        50,   // initial horizontal position
    y:        50,   // initial vertical position
    vx:       2,    // initial horizontal speed
    vy:       0     // initial vertical speed,
  }

  state = {
    intervalId: null,
    canvas:     null,
    x:          this.props.x,
    y:          this.props.y,
    vx:         this.props.vx,
    vy:         this.props.vy
  }

  constructor(props) {
    super(props);
  }

  onEachStep() {
    let   { x, y, vx, vy }  = this.state;
    const { canvas }        = this.state;
    const { g, radius }     = this.props;

    // gravity increases the vertical speed
    // horizontal speed increases horizontal position
    // vertical speed increases vertical position
    vy += g;
    x += vx;
    y += vy;

    if (y > canvas.height - radius) { // if ball hits the ground
      y = canvas.height - radius;     // reposition it at the ground
      vy *= -0.8;                     // then reverse and reduce its vertical speed
    }
    if (x > canvas.width + radius){   // if ball goes beyond canvas
      x = -radius;                    // wrap it around
    }
    this.setState({ x, y, vx, vy});
    this.drawBall();                       // draw the ball
  }

  drawBall() {
    const { x, y, canvas }    = this.state;
    const { color, radius }   = this.props;
    const context             = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI, true);
    context.closePath();
    context.fill();
  }

  componentDidMount() {
    this.setState({
      canvas: ReactDOM.findDOMNode(this.refs.canvas)
    });
    let intervalId = setInterval(() => {this.onEachStep()}, 1000/60); // 60 fps
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <section className='demo bouncing-ball'>
        <canvas ref='canvas' width='1000' height='600'></canvas>
      </section>
    );
  }
}

export default BouncingBall;
