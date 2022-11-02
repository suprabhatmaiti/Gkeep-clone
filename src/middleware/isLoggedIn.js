const jwt = require("jsonwebtoken");
const genericError = require("../utils/genericError");
module.exports = (req, res, next) => {
  const authToken = req.headers["auth-token"];
  if (!authToken) {
    return res.status(401).send({ message: "Access denied" });
  }
  try {
    const isVerified = jwt.verify(authToken, process.env.tokenSecret);
    if (!isVerified) {
      return res.status(401).send({ message: "Access denied" });
    }
    const userId = jwt.decode(authToken)._id;
    req.user = {
      _id: userId,
      verified: true,
      token: authToken,
    };
    next();
  } catch (error) {
    genericError.unexpectedError(res, error);
  }
};
