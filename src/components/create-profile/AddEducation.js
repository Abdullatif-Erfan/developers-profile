import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

function AddEducation({ addEducation, history }) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm();

  const onSubmit = async data => {
    // console.log(data);
    addEducation(data, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary2">Add your Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            {...register("school", {
              required: { value: true, message: "School is required" }
            })}
          />
          <p className="error">{errors.school && errors.school.message}</p>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            {...register("degree", {
              required: { value: true, message: "degree name is required" }
            })}
          />
          <p className="error">{errors.degree && errors.degree.message}</p>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            {...register("fieldofstudy")}
          />
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
