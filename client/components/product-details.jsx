import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    this.retrieveDetails();
  }

  retrieveDetails() {
    const productId = this.props.params.productId;
    fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ product: data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { product } = this.state;
    const { setView } = this.props;
    if (!product) {
      return null;
    }
    const newPrice = `$${(product.price / 100).toFixed(2)}`;
    return (
      <div className="product-detail-container">
        <div className="card">
        </div>
        <div className="col text-secondary backButton">
          <span>
            <i onClick={() => setView('catalog', {})} className="fas fa-angle-left mt-2  backButton"></i>
          </span>
          <span onClick={() => setView('catalog', {})} className="backButton">Back to catalog</span>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="product-image col">
              <img src={product.image} />
            </div>

            <div className="short-description col">
              <h3 className="card-title">{product.name}</h3>
              <h4 className="price">{newPrice}</h4>
              <p className="description">{product.shortDescription}</p>
              <button type="button" className="btn btn-info" onClick={() => { this.props.addToCart(this.state.product); }}>Add To Cart</button>
            </div>
          </div>

          <div className="long-description">
            <p className="card-text">{product.longDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
