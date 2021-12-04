import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import spinner from "../../assets/img/noImage.jpg";
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    company,
    status,
    location,
    skills
  }
}) => {
  return (
    <div className="profile bg-light">
      <img src={spinner} alt="user image" className="round-img" />
      <div>
        <h5>
          <b>{name}</b>
        </h5>
        <p>
          {status} {company && <span> at {company}</span>}{" "}
        </p>
        <small>
          <p className="my-1">{location && <span>{location}</span>}</p>
        </small>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fa fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
