import React from 'react';

export default class extends React.PureComponent {
  render() {
    return (
      <ul>
        <li>
          <a href="#/home">Home Page</a>
        </li>
        <li>
          <a href="#/login">Login Page</a>
        </li>
        <li>
          <a href="#/detail">Detail Page</a>
        </li>
      </ul>
    );
  }
}
