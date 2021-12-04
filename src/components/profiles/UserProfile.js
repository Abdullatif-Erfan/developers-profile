import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

function UserProfile({
  getProfileById,
  profile: { profile, loading },
  match,
  auth
}) {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);
  return (
    <Fragment>
      {" "}
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to profile
          </Link>
          {auth.isAuthenticated &&
            // auth.loading === false &&
            auth.user._id === profile[0].user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                {" "}
                Edit Profile{" "}
              </Link>
            )}
          <div class="profile-grid my-1">
            <ProfileTop profile={profile[0]} />
            <ProfileAbout profile={profile[0]} />

            <div class="profile-exp bg-white p-2">
              <h2 class="text-primary2">Experience</h2>
              {profile[0].experience.length > 0 ? (
                <Fragment>
                  {profile[0].experience.map(exp => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience</h4>
              )}
            </div>

            <div class="profile-edu bg-white p-2">
              <h2 class="text-primary2">Education</h2>
              {profile[0].education.length > 0 ? (
                <Fragment>
                  {profile[0].education.map(edu => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education</h4>
              )}
            </div>

            {/* Github  */}
            <div className="profile-github">
              <h2 className="text-primary my-1">
                <i className="fa fa-github"></i> Github Repos
              </h2>
              <div className="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Repo One
                    </a>
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                  </p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">Stars: 44</li>
                    <li className="badge badge-dark">Watchers: 21</li>
                    <li className="badge badge-light">Forks: 25</li>
                  </ul>
                </div>
              </div>
              <div className="repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Repo Two
                    </a>
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                  </p>
                </div>
                <div>
                  <ul>
                    <li className="badge badge-primary">Stars: 44</li>
                    <li className="badge badge-dark">Watchers: 21</li>
                    <li className="badge badge-light">Forks: 25</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}{" "}
    </Fragment>
  );
}

UserProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(UserProfile);
