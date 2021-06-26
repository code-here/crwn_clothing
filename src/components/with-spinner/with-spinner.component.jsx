import React from "react";
import "./with-spinner.styles.scss";

const WithSpinner =
  (WrappedCommponet) =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <div className="spinner-overlay">
        <div className="spinner-container"></div>
      </div>
    ) : (
      <WrappedCommponet {...otherProps} />
    );
  };

export default WithSpinner;
