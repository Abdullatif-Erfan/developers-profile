import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { useForm } from "react-hook-form";
const PostForm = ({ addPost }) => {
  //   const [text, setText] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const onSubmit = data => {
    // console.log(data);
    addPost(data);
    reset();
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Create a post</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("text", {
            required: { value: true, message: "Message is required" },
            minLength: {
              value: 6,
              message: "The message should be more than 6 characters"
            }
          })}
          name="text"
          cols="30"
          rows="5"
          placeholder="Add your post..."
        ></textarea>
        <p classNameName="error">{errors.text && errors.text.message}</p>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
