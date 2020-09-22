import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1
    };
    this.quantityChange = this.quantityChange.bind(this);
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

  quantityChange(operator) {
    this.setState((prevState, props) => {
      if (operator === '-' && prevState.quantity !== 1) {
        return (
          {
            quantity: prevState.quantity - 1
          });
      } else if (operator === '+') {
        return (
          {
            quantity: prevState.quantity + 1
          });
      }
    }
    );
  }

  render() {
    const { params: { categoryId } } = this.props;
    if (this.state.product) {
      return (
        <CSSTransitionGroup
          transitionName="transition"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <div className="modal fade" id="ModalViewCart" tabIndex="-1" role="dialog" aria-labelledby="ModalViewCartCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body sansFont">
                  Item(s) was added to your cart!
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Continue Shopping</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.props.setView('cart', {}); }}>View Cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="my-5" >
            <div className="col-md-8 bg-white border rounded py-3 m-auto">
              <div className="click text-muted ml-auto" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => { this.props.setView('catalog', { categoryId }); }}>
                <i className="fas fa-arrow-circle-left mr-2"></i>
            Back to Catalog
              </div>
              {/* <a href="#" className="card-link m-3 text-muted" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => { this.props.setView('catalog', { type: this.props.category }); }}> &lt; Back to Content</a> */}
              <div className="row m-4 mx-auto">
                <div className="col-md-4 m-2">
                  <img className="card-img-top ml-2 h-100" src={this.state.product.image.toString()} alt="Card image cap" />
                </div>
                <div className="col m-3 p-3">
                  <h1 className="card-title"><b>{this.state.product.name}</b></h1>
                  <h4 className="card-subtitle mb-2 text-muted">${(this.state.product.price / 100).toFixed(2)}</h4>
                  <p className="card-text">{this.state.product.shortDescription}</p>
                  <span className="sansFont">Quantity:</span>
                  <button className="btn incrementers previous border ml-2" onClick={() => this.quantityChange('-')}>-</button><span className="m-2">{this.state.quantity}</span>
                  <button href="#" className="btn incrementers next border" onClick={() => this.quantityChange('+')}>+</button>
                  <button type="button" className="btn btn-success ml-2 addToCart" data-toggle="modal" data-target="#ModalViewCart" onClick={() => { this.props.addToCart(this.state.product, this.state.quantity); }}>
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="row m-4 mx-auto">
                <div className="col-md-12 card-text">
                  {this.state.product.longDescription}
                </div>
              </div>
            </div>
          </div >
        </CSSTransitionGroup >
      );
    }
    return (
      null
    );

  }
}
