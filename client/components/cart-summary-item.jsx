import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    const price = `$${(this.props.item.price / 100).toFixed(2)}`;
    return (

      <div className="card my-1 my-sm-2">
        <div className="row align-items-center m-0">
          <div className="col-3">
            <img className="card-img-top p-sm-3" style={{ height: '7rem', objectFit: 'contain' }} src={this.props.item.image} alt =""/>
          </div>
          <div className="col-9">
            <h6 className="card-title mb-0 mb-sm-2">{this.props.item.name}</h6>
            <p className="card-text text-success mb-0 mb-sm-2">{price}</p>
            <p className="card-text text-truncate" style={{ height: '1.5rem' }}>{this.props.item.shortDescription}</p>
          </div>
        </div>
      </div>

    );
  }
}
