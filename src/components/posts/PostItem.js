import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import noImage from "../../assets/img/noImage.jpg";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  post: { _id, text, name, user, likes, comments, date },
  showActions
}) => (
  <div class="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img class="round-img" src={noImage} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p class="my-1">{text}</p>
      <p class="post-date">
        Posted on <Moment format="YYYY/MM/DD, h:mm:ss a">{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <button
            onClick={e => addLike(_id)}
            type="button"
            class="btn btn-light"
          >
            <i class="fa fa-thumbs-up"></i>{" "}
            <span>
              {likes.length > 0 && (
                <span class="comment-count">{likes.length}</span>
              )}
            </span>
          </button>

          <button
            onClick={e => removeLike(_id)}
            type="button"
            class="btn btn-light"
          >
            <i class="fa fa-thumbs-down"></i>
          </button>

          <Link to={`/post/${_id}`} class="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span class="comment-count">{comments.length}</span>
            )}
          </Link>

          {!auth.loading && user === auth.user._id && (
            <button
              onClick={e => deletePost(_id)}
              type="button"
              class="btn btn-danger"
            >
              <i class="fa fa-times"></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
