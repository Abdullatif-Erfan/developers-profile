import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import SinglePostComment from "./SinglePostComment";
import CommentItem from "./CommentItem";

const SinglePost = ({ getPost, match, postRecord: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <SinglePostComment postId={post._id} />
      <div className="comments">
        {post.comments.map(comm => (
          <CommentItem key={comm._id} comment={comm} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

SinglePost.propTypes = {
  getPost: PropTypes.func.isRequired,
  postRecord: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  postRecord: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(SinglePost);
