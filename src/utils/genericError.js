module.exports = {
  invalidRequest: (res) => res.status(400).send({ message: "Invalid Request" }),
  unexpectedError: (res, error = {}) =>
    res.status(403).send({ message: "Unexpected error", error }),
  userNotFound: (res) => res.status(400).send({ massage: "User not found" }),
};
