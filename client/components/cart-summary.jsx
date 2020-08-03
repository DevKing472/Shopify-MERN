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
    this.props.setView('catalog', {});
  }

  displayTotalPrice() {
    let sum = 0;
    this.props.array.map(index => {
      sum += parseInt(index.price);
    });
    return (sum / 100).toFixed(2);
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col text-secondary backButton">
              <span>
                <i onClick={this.handleSetView} className="fas fa-angle-left mt-2 mr-2 backButton"></i>
              </span>
              <span onClick={this.handleSetView} className="backButton">Back to catalog</span>
            </div>
          </div>
          <div className="row">
            <h1>My Cart</h1>

          </div>
          {this.displayCartItems()}
          <h3 className="total-price ml-5">{'Total Price: $' + this.displayTotalPrice()}</h3>

          <button onClick={() => this.props.setView('checkout')} className="btn btn-primary mt-5 ml-10">Checkout</button>

        </div>
      </>
    );
  }
}
