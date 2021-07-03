import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./CollectionPreview.style.scss";
import CollectionItem from "../collection-item/CollectionItem.component";

const CollectionPreview = ({ title, match, items }) => (
  <div className="collection-preview">
    <Link to={`${match.url}/${title.toLowerCase()}`} className="title">
      {title.toUpperCase()}
    </Link>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default withRouter(CollectionPreview);
