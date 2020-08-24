import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      creditCard: null,
      shippingAddress: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getTotalPurchase() {
    return this.props.cart.reduce((acc, cur) => acc + cur.price, 0);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleBackToCatalog() {
    this.props.setView('catalog', {});
  }

  handleSubmit(event) {
    event.preventDefault();
    const orderInformation = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(orderInformation);
    this.handleBackToCatalog();
  }

  render() {
    const { setView } = this.props;
    return (
      <div className="row mx-0">
        <div className="col-7 mx-auto d-flex flex-column">
          <h2 className="mb-4"><b>My Cart</b></h2>
          <h5 className="d-flex align-items-center text-muted mb-4">Order Total: ${(this.getTotalPurchase() * 0.01).toFixed(2)}</h5>
          <form className="d-flex flex-column">
            <label htmlFor="name"><b>Name</b></label>
            <input type="text" id="name" className="mb-4" value={this.state.name} onChange={this.handleChange} />
            <label htmlFor="card"><b>Credit Card</b></label>
            <input type="text" id="card" className="mb-4" value={this.state.creditCard} onChange={this.handleChange} />
            <label htmlFor="address"><b>Shipping Address</b></label>
            <textarea type="textarea" id="address" className="mb-4" value={this.state.shippingAddress} rows="4" onChange={this.handleChange} />
            <div className="d-flex justify-content-between">
              <div className="hello hover text-muted mb-4 pt-0 px-0 btn d-flex justify-content-start" onClick={() => setView('catalog', {})}>&lt; Continue Shopping</div>
              <button type="button" className="btn btn-primary" id="order" onClick={this.handleSubmit}>Place Order</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
