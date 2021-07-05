import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import "./ShopPage.style.scss";

import { startCollectionsFetch } from "../../redux/shop/shop.actions";
import CollectionOverviewWithSpinner from "../../components/collection-overview/collection-overview.container";
import CollectionPageWithSpinner from "../../pages/collection/collection.container";

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={match.path}
        component={CollectionOverviewWithSpinner}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageWithSpinner}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(startCollectionsFetch()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
