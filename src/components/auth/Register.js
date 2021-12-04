import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
// import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { registeration } from "../../actions/auth";
import PropTypes from "prop-types";

function Register({ setAlert, registeration, isAuthenticated }) {
  const {
    register,
    // watch,
    formState: { errors },
    handleSubmit
  } = useForm();

  // --------------------------- Testing Registration from this file ------------
  //   const onSubmit = data => console.log(data);
  // const onSubmit = async data => {
  //   if (data.password !== data.confirmPass) {
  //     props.setAlert("Password Not Match", "danger");
  //   } else {
  //     //   console.log(data);
  //     const newUser = {
  //       name: data.name,
  //       email: data.email,
  //       password: data.password
  //     };
  //     try {
  //       const config = { headers: { "Content-Type": "application/json" } };
  //       const body = JSON.stringify(newUser);
  //       const res = await axios.post("/users", body, config);
  //       console.log(res.data);
  //     } catch (err) {
  //       console.error(err.response.data);
  //     }
  //   }
  // };

  // ------------------------------------- Register through Redux --------------------
  const onSubmit = async data => {
    const { name, email, password, confirmPass } = data;
    if (password !== confirmPass) {
      console.log("No Match");
      setAlert("Password Not Match", "danger", 3000);
    } else {
      // console.log("Success");
      registeration({ name, email, password });
    }
  };

  //   console.log(watch("example"));
  //   console.log("errors", errors);

  // Redirect if Logged in
  if (isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          {/* <input type="text"  placeholder="Name" {...register("name")} /> */}
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: { value: true, message: "Name is required" }
            })}
          />
          <p className="error">{errors.name && errors.name.message}</p>
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error">Email is required</p>}

          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="password"
            {...register("password", {
              required: { value: true, message: "This is required" },
              minLength: { value: 6, message: "at least 6 characters" }
            })}
          />
          <p className="error">{errors.password && errors.password.message}</p>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="confirm password"
            {...register("confirmPass", {
              required: "This is required",
              minLength: { value: 6, message: "at least 6 characters" }
            })}
          />
          <p className="error">
            {errors.confirmPass && errors.confirmPass.message}
          </p>
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired, //ptfr
  registeration: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { setAlert, registeration }
)(Register);
