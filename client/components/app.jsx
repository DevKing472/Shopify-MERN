import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.userView = this.userView.bind(this);
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

  userView() {
    const { name, params } = this.state.view;
    if (name === 'catalog') {
      return (
        <ProductList setView={this.setView} />
      );
    }
    if (name === 'details') {
      return (
        <ProductDetails params={params} setView={this.setView} addToCart={this.addToCart} />
      );
    } else if (name === 'cart') {
      return (
        <CartSummary setView={this.setView} array={this.state.cart} />
      );
    } else if (name === 'checkout') {
      return (
        <CheckoutForm placeOrder={this.placeOrder} setView={this.setView} />
      );
    }
    return null;
  }

  placeOrder(object) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: object.name,
        creditCard: object.creditCard,
        shippingAddress: object.shippingAddress
      })
    })
      .then(response => response.json())
      .then(data => {
        return this.setState(() => ({
          cart: [],
          view: {
            name: 'catalog',
            params: {}
          }
        }));
      });
  }

  render() {

    return (
      <div>
        <Header title={'$Wicked Sales'} cartItemCount={this.state.cart.length} setView={this.setView}/>
        <div className= "container-view">
          {this.userView()}
        </div>
      </div>
    );
  }
}
