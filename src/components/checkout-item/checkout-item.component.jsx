import React from 'react';

import './checkout-item.style.scss';

const CheckoutItem = ({ item: { imageUrl, name, quantity, price } }) => (
    <div className="checkout-item">
        <div className="image-container">
        <img src={imageUrl} alt="product"  className="img" />
        </div>
        <span className="name">
            { name }
        </span>
        <span className="quantity">
            { quantity }
        </span>
        <span className="price">
            { price }
        </span>
        <div className="remove-button">&#10008;</div>
    </div>
)

export default CheckoutItem;