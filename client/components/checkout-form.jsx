import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: null,
      shippingAddress: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
    this.setState({
      name: '',
      creditCard: null,
      shippingAddress: ''
    });
  }

  render() {
    return (
      <div className="p-2">
        <div className="d-flex justify-content-center my-1">
          <h3>Please Enter your information below.</h3>
        </div>
        <form onSubmit={this.handleSubmit} className="mt-1">
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Enter Name Here"
                onChange={this.handleChange}
                required/>
            </div>
            <div className="form-group col-md-6">
              <input
                id="creditCard"
                type="text"
                className="form-control"
                placeholder="Enter Credit Card Number Here"
                onChange={this.handleChange}
                required/>
            </div>
            <div className="form-group col-md-12">
              <textarea
                id="shippingAddress"
                className="form-control"
                placeholder="Enter shipping Address Here"
                onChange={this.handleChange}
                required></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <span onClick={() => this.props.setView('catalog')} className="pointer H6">
             Continue Shopping
            </span>

            <button type="submit" className="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}
