import React from 'react';
import './CollectionItem.style.scss';

const CollectItem  = ({ imageUrl, name, price }) => (
  <div className="collection-item">
    <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} ></div>
    <div className="collection-footer">
      <span className="name">{name}</span>
      <span className="price">&#8377;{price}</span>
    </div>
  </div>
)

export default CollectItem;