import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import CollectionOverview from "./collection-overview.component";
import WithSpinner from "../with-spinner/with-spinner.component";
import { selectIsCollectionsFetching } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching,
});

const CollectionOverviewWithSpinner = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);

export default CollectionOverviewWithSpinner;
