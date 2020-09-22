import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import FrontModal from './front-modal';
import FrontPage from './front-page';
import Footer from './footer';
import Transition from './transition';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      message: null,
      isLoading: true,
      view: {

        name: 'front',
        params: {}
      },
      modalOpen: true
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.userView = this.userView.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => {
        this.setState({ cart: data });
      })
      .catch(error => { console.error(error); });
  }

  addToCart(product) {
    fetch('/api/cart/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => result.json())
      .then(data => {
        this.setState({ cart: this.state.cart.concat(data) });
      });
  }

  setView(name, params) {
    const view = { name, params };
    this.setState({ view });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  userView() {
    const { name, params } = this.state.view;
    const modal = this.state.modalOpen ? <FrontModal close={this.closeModal}></FrontModal> : null;
    if (name === 'front') {
      return (
        <div>
          {modal}

          <div id="page-container">
            <div id="content-wrap">
              <Transition key={name}>
                <FrontPage setView={this.setView} />
              </Transition>
            </div>
            <Footer />
          </div>
        </div>
      );
    } else if (name === 'catalog') {
      return (
        <div id="page-container">
          <div id="content-wrap">
            <Transition key={name}>
              <ProductList setView={this.setView} params={params} />
            </Transition>
          </div>
          <Footer />
        </div>
      );
    } else if (name === 'details') {
      return (
        <div id="page-container">
          <div id="content-wrap">
            <Transition key={name}>
              <ProductDetails params={params} setView={this.setView} addToCart={this.addToCart} />
            </Transition>
          </div>
          <Footer />
        </div>

      );
    } else if (name === 'cart') {
      return (
        <div id="page-container">
          <div id="content-wrap">
            <Transition key={name}>
              <CartSummary setView={this.setView} array={this.state.cart} />
            </Transition>
          </div>
          <Footer />
        </div>

      );
    } else if (name === 'checkout') {
      return (
        <div id="page-container">
          <div id="content-wrap">
            <Transition key={name}>
              <CheckoutForm cart={this.state.cart} placeOrder={this.placeOrder} setView={this.setView} />
            </Transition>
          </div>
          <Footer />
        </div>

      );
    }
    return null;
  }

  placeOrder(order) {
    fetch('/api/orders/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: order.name,
        creditCard: order.creditCard,
        shippingAddress: order.shippingAddress
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ cart: [] });
        this.setView('catalog', {});
      })
      .catch(err => console.error(err));
  }

  render() {

    return (
      <div>
        <Header title={'Shopify Fitness'} cartItemCount={this.state.cart.length} setView={this.setView}/>

        <div className= "container-view cart-summary-container my-2 my-sm-3 p-0">
          {this.userView()}
        </div>
      </div>
    );
  }
}
