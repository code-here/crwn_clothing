import React from 'react';
import SHOP_DATA from './shop.data';
import './ShopPage.style.scss';
import CollectionPreview from '../../components/collection-preview/CollectionPreview.component';


class ShopPage extends React.Component {
  constructor() {
    super();

    this.state = {
      collections: SHOP_DATA
    }
  }
  render() {
    const { collections } = this.state;
    return (<div className="shop-page">
        {
          collections.map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps} />)
        }
    </div>)
  }
}

export default ShopPage;