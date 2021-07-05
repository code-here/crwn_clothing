import CollectionPage from "./collection.component";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsCollectionsLoded } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoded(state),
});

const CollectionPageWithSpinner = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageWithSpinner;
