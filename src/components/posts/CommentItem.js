import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import noImage from "../../assets/img/noImage.jpg";
import { deleteComment } from "../../actions/post";
const CommentItem = ({
  comment: { text, user, name, avatar, _id, date },
  postId,
  auth,
  deleteComment
}) => {
  return (
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
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger btn-xs"
            onClick={e => deleteComment(postId, _id)}
          >
            <i className="fa fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
  deleteComment: PropTypes.func.isRequired
  //   auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
