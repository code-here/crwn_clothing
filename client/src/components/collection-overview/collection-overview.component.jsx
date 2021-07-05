import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './collection-overview.style.scss';

import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';
import CollectionPreview from '../../components/collection-preview/CollectionPreview.component';


const CollectionOverview = ({ collections }) => (
    <div className="collection-overview">
        {
            collections.map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps} />)
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview);