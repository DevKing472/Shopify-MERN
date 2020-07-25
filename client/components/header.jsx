import React from 'react';

export default class Header extends React.Component {

  render() {

    return (
      <nav className="navbar text-white navbar-expand-lg navbar-dark bg-dark">
        <h3 className ="ml-5">{this.props.title}</h3>
      </nav>
    );
  }
}
