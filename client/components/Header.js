// core modules
import React, { Component, PropTypes }  from 'react';
import { Link }                         from 'react-router';

class Header extends Component {

  static propTypes = {
    dispatch:       PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to={'/'} title='Demos'>Demos</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
