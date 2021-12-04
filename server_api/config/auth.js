const jwt = require("jsonwebtoken");
const myToken = require("../config/keys").jwtSecret;

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    console.log("No token, Authorization denied");
    // return res.status(401).json({ msg: "No token, Authorization denied " });
    return res
      .status(401)
      .json({ errors: [{ msg: "No token, Authorization denied" }] });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, myToken);
    // console.log("Decoded.user=", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("Token is not valid");
    res.status(401).json({ msg: "Token is not valid" });
  }
};
