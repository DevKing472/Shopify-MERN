import React from 'react';

export default class Header extends React.Component {

  render() {
    const cartItemCount = this.props.cartItemCount;
    return (
      <nav className="navbar text-white navbar-expand-lg navbar-dark bg-dark">
        <h3 className ="ml-5">{this.props.title}</h3>
        <div className="cart">
          <p className="m-0 cart-item-number">{cartItemCount === 1 ? cartItemCount + ' Item' : cartItemCount + ' Items'}</p>
          <i className="fas mt-1 mx-2 fa-shopping-cart"></i>
        </div>
      </nav>
    );
  }
}
