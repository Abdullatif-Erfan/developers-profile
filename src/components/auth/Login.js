import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
// import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

function Login({ login, isAuthenticated }) {
  const {
    register,
    // watch,
    formState: { errors },
    handleSubmit
  } = useForm();

  // ---------------------------------- Login without redux-----------------
  // const onSubmit = async data => {
  //   // console.log(data);
  //   const newUser = {
  //     email: data.email,
  //     password: data.password
  //   };
  //   try {
  //     const config = { headers: { "Content-Type": "application/json" } };
  //     const body = JSON.stringify(newUser);
  //     const res = await axios.post("/auth", body, config);
  //     // console.log(res.data);
  //   } catch (err) {
  //     console.error(err.response.data);
  //   }
  // };

  // ------------------------------------- Login With Redux --------------
  const onSubmit = async data => {
    login(data.password, data.email);
  };

  //   console.log(watch("example"));
  //   console.log("errors", errors);

  // Redirect if Logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fa fa-user"></i> Sign Into Your Account
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error">Email is required</p>}
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

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
