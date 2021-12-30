const jwt = require("jsonwebtoken");
module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers.auth;
  if (!authHeader) {
    return res.status(401).send("No estás autorizado.");
  }
  const token = authHeader;
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(403).send("El token no es válido.");
    }
    req.user = user.id;
    next();
  });
};
