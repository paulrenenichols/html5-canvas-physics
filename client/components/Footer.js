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
        <nav>
          <ul>
            <li><a title='About'           href='#'><span>About Us</span></a></li>
          </ul>
        </nav>
      </footer>
    );
  }
}

export default Footer;
