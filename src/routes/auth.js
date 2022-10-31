const express = require("express");
const mongoose = require("mongoose");
const { auth } = require("../validator");
const validator = require("../validator");
const route = express.Router();
const User = mongoose.model("User");

route.get("/", (req, res) => {
  res.send("auth panel");
});
route.put("/signup", validate({ body: auth.signup }), (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, password, emailId } =
    req.body;
  const user = new User({
    firstName,
    lastName,
    dateOfBirth,
    gender,
    emailId,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  user.save();
  req.send(user);
});
module.exports = route;
