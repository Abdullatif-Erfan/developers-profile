//rafcp
import React, { useState, Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentUserProfile } from "../../actions/profile";
// import { setAlert } from "../../actions/alert";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentUserProfile,
  history
}) => {
  //   var status = "";
  useEffect(() => {
    getCurrentUserProfile();
    // setValue('name', 'value', { shouldValidate: true })
    setValue("status", loading || !profile.status ? "" : profile.status);
    setValue("company", loading || !profile.company ? "" : profile.company);
    setValue("website", loading || !profile.website ? "" : profile.website);
    setValue("location", loading || !profile.location ? "" : profile.location);
    setValue(
      "skills",
      loading || !profile.skills ? "" : profile.skills.join(",")
    );
    setValue(
      "githubusername",
      loading || !profile.githubusername ? "" : profile.githubusername
    );
    setValue("bio", loading || !profile.bio ? "" : profile.bio);
    setValue(
      "twitter",
      loading || !profile.social ? "" : profile.social.twitter
    );
    setValue(
      "facebook",
      loading || !profile.social ? "" : profile.social.facebook
    );
    setValue(
      "linkedin",
      loading || !profile.social ? "" : profile.social.linkedin
    );
    setValue(
      "youtube",
      loading || !profile.social ? "" : profile.social.youtube
    );
    setValue(
      "instagram",
      loading || !profile.social ? "" : profile.social.instagram
    );

    // setValue([{ company: profile.company }, { location: profile.location }]);
  }, [loading, getCurrentUserProfile]);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    register,
    // watch,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm();

  const onSubmit = async data => {
    // console.log(watch());
    createProfile(data, history, true);
  };

  return (
    <div>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fa fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field </small>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <select name="status" {...register("status")}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="MIS Specialist">MIS Specialist</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Company"
            {...register("company", {
              required: { value: true, message: "Company Name is required" }
            })}
          />
          <small className="form-text">
            Could be your own company or one you work for
            <p className="error">{errors.company && errors.company.message}</p>
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Website"
            {...register("website")}
          />
          <small className="form-text">
            Could be your own or a company website
            <p className="error">{errors.website && errors.website.message}</p>
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Location"
            {...register("location")}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
            <p className="error">
              {errors.location && errors.location.message}
            </p>
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="* Skills"
            {...register("skills", {
              required: { value: true, message: "Skill is required" }
            })}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            <p className="error">{errors.skills && errors.skills.message}</p>
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Github Username"
            {...register("githubusername")}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
            <p className="error">
              {errors.githubusername && errors.githubusername.message}
            </p>
          </small>
        </div>
        <div className="form-group">
          <textarea
            class="form-control"
            placeholder="A short bio of yourself"
            {...register("bio")}
          ></textarea>
          <small className="form-text">
            Tell us a little about yourself
            <p className="error">{errors.bio && errors.bio.message}</p>
          </small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fa fa-twitter fa-2x"></i>
              <input
                type="text"
                class="form-control"
                placeholder="Twitter URL"
                {...register("twitter")}
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-facebook fa-2x"></i>
              <input
                type="text"
                class="form-control"
                placeholder="Facebook URL"
                {...register("facebook")}
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-youtube fa-2x"></i>
              <input
                type="text"
                class="form-control"
                placeholder="YouTube URL"
                {...register("youtube")}
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-linkedin fa-2x"></i>
              <input
                type="text"
                class="form-control"
                placeholder="Linkedin URL"
                {...register("linkedin")}
              />
            </div>

            <div className="form-group social-input">
              <i className="fa fa-instagram fa-2x"></i>
              <input
                type="text"
                class="form-control"
                placeholder="Instagram URL"
                {...register("instagram")}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentUserProfile }
)(withRouter(EditProfile));
