import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    const price = `$${(this.props.item.price / 100).toFixed(2)}`;
    return (
      <div className="row my-3 p-2 border cart-item">
        <div className="col-5">
          <img height="325px" src={this.props.item.image} alt =""/>
        </div>
        <div className="col-7">
          <h3>{this.props.item.name}</h3>
          <h5 className="text-secondary">{price}</h5>
          <p>{this.props.item.shortDescription}</p>
        </div>
      </div>
    );
  }
}
