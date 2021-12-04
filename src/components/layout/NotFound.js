import React, { Fragment } from "react";

export const NotFound = () => {
  return (
    <Fragment>
      <center className="notfound">
        <h2 className="x-large text-primary2">
          <i className="fa fa-exclamation-triangle"></i> Page Not Found
        </h2>
        <p className="large">Sorry, this page does not exist</p>
      </center>
    </Fragment>
  );
};
