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
    const { params } = this.props;
    // todo get products GET request according to category ID passed from app comp
    fetch(`/api/products/category/${params.categoryId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ products: data });
      })
      .catch(error => {
        console.error(error);
      });

  }

  render() {
    const { setView, params } = this.props;
    const { products } = this.state;
    const { categoryId } = params;
    return (
      <>
        <div className="container">
          <div className="click text-muted ml-auto mt-4" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => { this.props.setView('front', {}); }}>
            <i className="fas fa-arrow-circle-left mr-2"></i>
        Back to Home
          </div>
          <div className="row">
            {
              products.map(product => {
                const { productId } = product;
                return (

                  <div key={product.productId} className="col-sm-4 col-md-6 col-lg-4 d-flex justify-content-center" onClick={() => setView('details', { categoryId, productId })}>
                    <ProductListItem item={product} />
                  </div>

                );
              })
            }

          </div>
        </div>
      </>
    );
  }
}
