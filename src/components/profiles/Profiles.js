import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profile, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  //   console.log("profiles=", profiles);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h3 className="large text-primary">Developers</h3>
          <p className="lead">
            <i className="fa fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profile != null && profile.length > 0 ? (
              profile.map(prof => <ProfileItem key={prof._id} profile={prof} />)
            ) : (
              <h4>No profile found</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
