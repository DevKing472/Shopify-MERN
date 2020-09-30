
import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      card: '',
      address: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    this.setState({
      [property]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
  }

  handleReset() {
    this.props.setView('front', {});
    this.setState({
      name: '',
      card: '',
      address: ''
    });
  }

  render() {
    const cartItems = this.props.cart;
    let totalPriceNum = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalPriceNum += cartItems[i].price;
    }
    const totalPrice = (totalPriceNum / 100).toFixed(2);
    const submitInfo = { name: this.state.name, creditCard: this.state.card, shippingAddress: this.state.address };
    return (
      <div className="container py-5">
        <div className="mb-3">
          <h1 className="text-left my-2">Checkout</h1>
          <h3 className="text-left my-2">Total: ${totalPrice} </h3>
          <div className="row">
            <div className="col-md-12">
              <form className="text-center p-3 border rounded bg-white" onSubmit={() => { this.handleSubmit(event, submitInfo); }}>
                <div className="form-group">
                  <h3 className="text-left">Billing/Shipping Address</h3>
                </div>
                <div className="form-group">
                  <label className="mr-2" htmlFor="name" style={{ float: 'left' }}>Full Name*</label>
                  <input required type="text" className="form-control " onChange={this.handleChange} name="name" />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="name" style={{ float: 'left' }}>Phone</label>
                    <input
                      className="form-control"
                      type="text"
                      autoComplete="new-password"
                      name="phone"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="email" style={{ float: 'left' }}>Email</label>
                    <input
                      className="form-control"
                      type="text"
                      autoComplete="new-password"
                      name="email"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label className="mr-2" style={{ float: 'left' }}>Address 1*</label> <br></br>
                    <input required type="text" className="form-control" onChange={this.handleChange} name="address"></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputAddress2" style={{ float: 'left' }}>Address 2</label>
                    <input
                      className="form-control"
                      type="text"
                      name="address2"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity" style={{ float: 'left' }}>City</label>
                    <input
                      className="form-control"
                      type="text"
                      autoComplete="new-password"
                      name="city"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="inputState" style={{ float: 'left' }}>State</label>
                    <select
                      className="form-control"
                      name="state"
                    >
                      <option defaultValue hidden></option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="inputZip" style={{ float: 'left' }}>Zip</label>
                    <input
                      className="form-control"
                      type="text"
                      autoComplete="new-password"
                      name="zipCode"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <h3 className="text-left">Payment Details</h3>
                </div>
                <div className="form-row p-3 border rounded mb-3">
                  <div className="form-group col-md-6">
                    <div className="form-group">
                      <label className="mr-2" style={{ float: 'left' }}>Credit Card Number*<img className="col-4" src="./images/creditcards.jpg" /></label>
                      <input required type="text" className="form-control" onChange={this.handleChange} name="card" />
                    </div>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputState" style={{ float: 'left' }}>Month</label>
                    <select
                      name="month"
                      className="form-control"
                    >
                      <option defaultValue hidden></option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputState" style={{ float: 'left' }}>Year</label>
                    <select
                      className="form-control"
                      name="year"
                    >
                      <option defaultValue hidden></option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputZip" style={{ float: 'left' }}>CVV</label>
                    <input
                      type="text"
                      autoComplete="new-password"
                      name="cvv"
                      className="form-control"
                    />
                  </div>
                </div>
                <span className="my-4">
                  * For simplicity, only fields marked with * need to be filled in order to place an order.
                </span> <br></br>
                <br></br>
                <span className="my-4">
                  This website is for demonstration purposes only and no
                  payment processing will occur. Please note that personal information
                  such as names and credit card information should not
                  be used on on this form.
                </span>
                <div className="my-2">
                  {(this.state.name !== '' && this.state.card !== '' && this.state.address !== '') ? <button type="submit" className="btn btn-success m-1" data-toggle="modal" data-target="#ModalCheckout">Place Order</button> : <button type="submit" className="btn btn-success m-1">Place Order</button>}
                </div>
              </form>
            </div>
          </div >
        </div >
        <div className="click text-muted ml-auto m-4" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => { this.handleReset(); }}>
          <i className="fas fa-arrow-circle-left mr-2"></i>
            Continue Shopping
        </div>
        <div className="modal fade" id="ModalCheckout" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="ModalCheckoutCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body sansFont">
                Your order has been placed! Thanks for shopping with us!
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.handleReset(); }}>Back to Home</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
