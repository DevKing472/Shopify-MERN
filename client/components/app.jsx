import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
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
        <ProductDetails params={params} setView={this.setView} />
      );
    }
    return null;
  }

  render() {

    return (
      <div>
        <Header title={'$Wicked Sales'}/>
        <div className= "container-view">
          {this.userView()}
        </div>
      </div>
    );
  }
}
