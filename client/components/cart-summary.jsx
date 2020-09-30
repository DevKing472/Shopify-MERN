import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetView = this.handleSetView.bind(this);
  }

  componentDidMount() {
    this.displayCartItems();
  }

  displayCartItems() {
    const cartArray = this.props.array;
    return cartArray.map((item, index) => {
      return (
        <CartSummaryItem key={index} item={item}></CartSummaryItem>
      );
    });
  }

  handleSetView() {
    this.props.setView('front', {});
  }

  displayTotalPrice() {
    let sum = 0;
    this.props.array.map(index => {
      sum += parseInt(index.price);
    });
    return (sum / 100).toFixed(2);
  }

  render() {

    if (this.props.array.length > 0) {
      return (
        <div className="container">
          <div className="row m-0">
            <span>
              <div className="click text-muted ml-auto" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={this.handleSetView}>
                <i className="fas fa-arrow-circle-left mr-2"></i>
      Back to Catalog
              </div>
            </span>
            {/* <a href="#" className="card-link m-3 text-muted" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => { this.props.setView('catalog', { type: this.props.category }); }}> &lt; Back to Content</a> */}
          </div>
          <div className="row m-0">
            <h1><b>My Cart</b></h1>

          </div>
          {this.displayCartItems()}
          <h4 className="total-price"><b>Item Total: ${this.displayTotalPrice()}</b></h4>

          <button onClick={() => this.props.setView('checkout')} className="btn btn-primary mt-5 mb-5 ml-10">Proceed To Checkout</button>

        </div>
      );
    }
    return (
      <div className="container">
        <div className="click text-muted ml-auto m-4" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => { this.props.setView('front', {}); }}>
          <i className="fas fa-arrow-circle-left mr-2"></i>
          Back to Home
        </div>
        <h1 className="mb-2">My Cart</h1>
        <h3 className="my-2">Cart is Empty!</h3>
      </div>
    );
  }
}
