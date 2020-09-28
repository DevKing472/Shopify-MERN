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
    return (
      <>
        <div className="container">
          <div className="row m-0">
            <div className="col text-secondary backButton">
              <span>
                <i onClick={this.handleSetView} className="fas fa-arrow-circle-left mr-4"></i>
              </span>
              <span onClick={this.handleSetView} className="backButton ">Back to catalog</span>
            </div>
          </div>
          <div className="row m-0">
            <h1><b>My Cart</b></h1>

          </div>
          {this.displayCartItems()}
          <h4 className="total-price"><b>Item Total: ${this.displayTotalPrice()}</b></h4>

          <button onClick={() => this.props.setView('checkout')} className="btn btn-primary mt-5 mb-5 ml-10">Proceed To Checkout</button>

        </div>
      </>
    );
  }
}
