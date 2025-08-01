// middleware/auth.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  //console.log(req.headers);

  const token = req.headers["authorization"]?.split(" ")[1]; // Assuming Bearer token format
  //console.log(token);

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    //console.log(req.user);
    req.user = decoded; // Attach the decoded payload to req.user

    //console.log(req.user);
    next();
  });
};

module.exports = authenticate;
