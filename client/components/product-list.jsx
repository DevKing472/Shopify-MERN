import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    // components appears page, calls getProducts
    this.getProducts();
  }

  getProducts() {
    // todo get products GET request
    fetch('/api/products')
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data });
      })
      .catch(error => {
        console.error(error);
      });

  }

  render() {
    const { setView } = this.props;
    const { products } = this.state;
    return (
      <div className="row">
        {
          products.map(product => {
            const { productId } = product;
            return (
              <div key={product.productId} className="col-4" onClick={() => setView('details', { productId })}>
                <ProductListItem item={product} />
              </div>
            );
          })
        }
      </div>
    );
  }
}
