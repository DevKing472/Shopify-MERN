import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      city: '',
      state: '',
      zip: '',
      month: '',
      year: '',
      cvv: '',
      disclaimerChecked: false,
      isSubmitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleDisclaimer = this.handleDisclaimer.bind(this);
  }

  handleChange(event) {
    const property = event.target.name;
    this.setState({
      [property]: event.target.value
    });
  }

  handleBack() {
    this.props.onClick('front', {});
  }

  handleDisclaimer() {
    this.setState({
      disclaimerChecked: true
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
      creditCard: '',
      shippingAddress: '',
      city: '',
      state: '',
      zip: '',
      month: '',
      year: '',
      cvv: '',
      disclaimerChecked: false,
      isSubmitted: false
    });
  }

  render() {
    const cartItems = this.props.cart;
    let totalPriceNum = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalPriceNum += cartItems[i].price;
    }
    const totalPrice = (totalPriceNum / 100).toFixed(2);
    let disclaimerStyle;

    if (this.state.isSubmitted && this.state.disclaimerChecked) {
      disclaimerStyle = { color: '#212529' };
    }
    if (!this.state.isSubmitted && !this.state.disclaimerChecked) {
      disclaimerStyle = { color: '#212529' };
    }
    if (this.state.isSubmitted && !this.state.disclaimerChecked) {
      disclaimerStyle = { color: '#dc3545' };
    }

    return (
      <div className="form">
        <p className="mb-3 btn-back text-muted d-flex align-items-center mt-3" onClick={this.handleBack}><i className="fas fa-arrow-circle-left ml-3 mr-2"></i> <span>Keep Shopping</span></p>
        <h1 className="mt-3 ml-3 pl-3">Checkout</h1>
        <p className="mt-3 ml-3 text-muted pl-3">Order Total: $<span>{totalPrice}</span></p>
        <form onSubmit={this.handleSubmit} className="d-flex justify-content-between flex-wrap">
          <div className="checkout-section col-12 col-md-6 p-3">
            <div className="checkout-content d-flex flex-wrap p-3">
              <h5 className="font-weight-bold">Shipping Information</h5>
              <div className="form-group w-100 mb-0">
                <label className="mt-3" htmlFor="name" >Full Name<sup className="text-danger">*</sup></label>
                <input className="w-100 form-control" type="name" name="name" id="name" onChange={this.handleChange} />
                {!this.state.name && this.state.isSubmitted && <small className="text-danger">Please enter your full name</small>}
              </div>

              <div className="form-row">
                <div className="form-group col-8 mb-0">
                  <label className="mt-3 w-100" htmlFor="address">Street Address<sup className="text-danger">*</sup></label>
                  <input className="w-100 form-control" name="address" id="address" onChange={this.handleChange} />
                </div>
                <div className="form-group col-4 mb-0">
                  <label className="mt-3 w-100" htmlFor="apt">Apt/Suite</label>
                  <input className="w-100 form-control" name="apt" id="apt" onChange={this.handleChange} />
                </div>
                {!this.state.address && this.state.isSubmitted && <small className="text-danger mb-1 pl-1">Please enter your street address</small>}
              </div>

              <div className="form-row">
                <div className="form-group col-5 mb-0">
                  <label className="mt-3 w-100" htmlFor="city">City<sup className="text-danger">*</sup></label>
                  <input className="w-100 form-control" name="city" id="city" onChange={this.handleChange} />
                </div>
                <div className="form-group col-3 mb-0">
                  <label className="mt-3 w-100" htmlFor="state">State<sup className="text-danger">*</sup></label>
                  <select className="w-100 form-control" name="state" id="state" onChange={this.handleChange}>
                    <option hidden>--</option>
                    <option value="AL">AL</option>
                    <option value="AK">AK</option>
                    <option value="AZ">AZ</option>
                    <option value="AR">AR</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="IA">IA</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="ME">ME</option>
                    <option value="MD">MD</option>
                    <option value="MA">MA</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MS">MS</option>
                    <option value="MO">MO</option>
                    <option value="MT">MT</option>
                    <option value="NE">NE</option>
                    <option value="NV">NV</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NY">NY</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VT">VT</option>
                    <option value="VA">VA</option>
                    <option value="WA">WA</option>
                    <option value="WV">WV</option>
                    <option value="WI">WI</option>
                    <option value="WY">WY</option>
                  </select>
                </div>
                <div className="form-group col-4 mb-0">
                  <label className="mt-3 w-100" htmlFor="zip">Zip Code<sup className="text-danger">*</sup></label>
                  <input className="w-100 form-control" name="zip" id="zip" minLength="5" maxLength="5" onChange={this.handleChange} />
                </div>
                {this.state.isSubmitted && (!this.state.city || !this.state.state || !this.state.zip) && <small className="text-danger pl-1">Please enter your city, state, and 5 digit zip code</small>}
              </div>

            </div>
          </div>
          <div className="checkout-section col-12 col-md-6 p-3">
            <div className="checkout-content p-3">
              <h5 className="font-weight-bold">Payment Information</h5>
              <div className="form-row credit-card">
                <label className="mt-3 w-100" htmlFor="credit-card">Credit Card<sup className="text-danger">*</sup></label>
                <input className="col-8 form-control" type="credit-card" name="creditCard" id="credit-card" minLength="16" maxLength="16" value={this.state.creditCard} onChange={this.handleChange} />
                <img className="col-4" src="./images/creditcards.jpg" alt="" />
                {!this.state.creditCard && this.state.isSubmitted && <small className="text-danger">Please enter a 16 digit card number</small>}
              </div>

              <div className="form-row">
                <div className="form-group col-4 mb-0 pl-0">
                  <label className="mt-3 w-100" htmlFor="month">Month<sup className="text-danger">*</sup></label>
                  <select className="w-100 form-control" name="month" id="month" onChange={this.handleChange}>
                    <option hidden>--</option>
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
                <div className="form-group col-4 mb-0">
                  <label className="mt-3 w-100" htmlFor="year">Year<sup className="text-danger">*</sup></label>
                  <select className="w-100 form-control" name="year" id="year" onChange={this.handleChange}>
                    <option hidden>--</option>
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
                  </select>
                </div>
                <div className="form-group col-4 mb-0">
                  <label className="mt-3 w-100" htmlFor="cvv">CVV<sup className="text-danger">*</sup></label>
                  <input className="w-100 form-control" name="cvv" id="cvv" minLength="3" maxLength="3" onChange={this.handleChange} />
                </div>
                {this.state.isSubmitted && (!this.state.month || !this.state.year || !this.state.cvv) && <small className="text-danger">Please enter the expiration date and 3 digit cvv</small>}
              </div>

            </div>
          </div>
          <div className="col-12">

            <div className="form-check info-disclaimer ml-3 mb-3">
              <input className="form-check-input" type="checkbox" value="" id="info-disclaimer" onChange={this.handleDisclaimer}/>
              <label htmlFor="info-disclaimer" style={disclaimerStyle}>I understand that this website is for demonstration purposes only, that no payment processing will occur, and that personal information such as names, addresses, and real credit card numbers should not be used upon submission of this form.</label>
            </div>
            <div className="my-2">
              {(this.state.name !== '' && this.state.card !== '' && this.state.address !== '') ? <button type="submit" className="btn btn-success m-1" data-toggle="modal" data-target="#ModalCheckout">Place Order</button> : <button type="submit" className="btn btn-success m-1">Place Order</button>}
            </div>
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
        </form>
      </div>
    );
  }
}
