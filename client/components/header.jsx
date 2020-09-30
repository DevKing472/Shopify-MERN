import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleCartView = this.handleCartView.bind(this);
  }

  handleCartView() {
    this.props.setView('cart', {});
  }

  render() {
    const cartItemCount = this.props.cartItemCount;
    return (
      <nav className="navbar sticky-top text-white navbar-expand-lg navbar-dark bg-dark d-flex flex-nowrap justify-content-between">
        <h1 className ="ml-1 title-header" style={{ cursor: 'pointer' }} onClick={() => { this.props.setView('front', {}); }}>{this.props.title}</h1>
        <div onClick={this.handleCartView} className="cart">
          <h4 className="m-0 cart-item-number">{cartItemCount === 1 ? cartItemCount + ' Item' : cartItemCount + ' Items'}</h4>
          <i className="fas mb-1 mx-2 fa-shopping-cart"></i>
        </div>
      </nav>
    );
  }
}
