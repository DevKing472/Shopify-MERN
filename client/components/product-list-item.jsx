import React from 'react';

export default function ProductListItem(props) {
  const { image, name, price, shortDescription } = props.item;
  return (
    <div className="card" style= {{ width: '24rem' }}>
      <img src={image} className="card-img-top img-responsive image-card" />
      <div className="card-body">
        <p className="price-text">{price}</p>
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{shortDescription}</p>
      </div>
    </div>
  );
}
