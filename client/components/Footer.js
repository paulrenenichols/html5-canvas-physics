import React, { Component, PropTypes }  from 'react';
import { Link }                         from 'react-router'

class Footer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div>&#9426; 2016</div>
      </footer>
    );
  }
}

export default Footer;
