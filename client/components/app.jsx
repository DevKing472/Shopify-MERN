import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

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
    }
    return null;
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
