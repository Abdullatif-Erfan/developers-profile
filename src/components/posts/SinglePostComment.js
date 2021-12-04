import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const SinglePostComment = ({ addComment, postId }) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm();
  const onSubmit = data => {
    addComment(postId, data);
    reset();
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("text", {
            required: { value: true, message: "Comment is required" },
            minLength: {
              value: 6,
              message: "The comment should be more than 6 characters"
            }
          })}
          name="text"
          cols="30"
          rows="5"
          placeholder="Add Your Comment..."
        ></textarea>
        <p className="error">{errors.text && errors.text.message}</p>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

SinglePostComment.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(SinglePostComment);
