import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <ul className="navigation">
          <li className="navigation__item">
            <Link to="/">Search</Link>
          </li>
          <li className="navigation__item">
            <Link to="/rate">Rated</Link>
          </li>
        </ul>
      </div>
    );
  }
}
