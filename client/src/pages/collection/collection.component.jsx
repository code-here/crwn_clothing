import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/CollectionItem.component";
import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.style.scss";

const CollectionPage = ({ collection }) => {
  let { title, items } = collection;
  return (
    <div className="collection-page">
      <div className="title">{title}</div>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    collection: selectCollection(ownProps.match.params.collectionId)(state),
  };
};

export default connect(mapStateToProps)(CollectionPage);
