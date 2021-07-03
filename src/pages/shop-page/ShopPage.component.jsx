import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import "./ShopPage.style.scss";

import { startCollectionsFetch } from "../../redux/shop/shop.actions";
import CollectionOverviewWithSpinner from "../../components/collection-overview/collection-overview.container";
import CollectionPageWithSpinner from "../../pages/collection/collection.container";

class ShopPage extends React.Component {
  componentDidMount() {
    const { startFetchCollectionsAsync } = this.props;
    startFetchCollectionsAsync();
  }

  render() {
    const { match } = this.props;
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  startFetchCollectionsAsync: () => dispatch(startCollectionsFetch()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
