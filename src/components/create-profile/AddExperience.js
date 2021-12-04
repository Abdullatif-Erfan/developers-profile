import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

function AddExperience({ addExperience, history }) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm();

  const onSubmit = async data => {
    // console.log(data);
    addExperience(data, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary2">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            {...register("title", {
              required: { value: true, message: "Title is required" }
            })}
          />
          <p className="error">{errors.title && errors.title.message}</p>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            {...register("company", {
              required: { value: true, message: "Company name is required" }
            })}
          />
          <p className="error">{errors.company && errors.company.message}</p>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" {...register("location")} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" {...register("from")} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              {...register("current")}
              value=""
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" {...register("to")} disabled={watch("current")} />
        </div>
        <div className="form-group">
          <textarea
            {...register("description")}
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { addExperience }
)(withRouter(AddExperience));
