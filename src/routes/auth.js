const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const genericError = require("../utils/genericError");
const { auth, validate } = require("../validator");
// const validator = require("../validator");
const route = express.Router();
const User = mongoose.model("User");

route.get("/", (req, res) => {
  res.send("auth panel");
});
route.put("/signup", validate({ body: auth.signup }), async (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, password, emailId } =
    req.body;
  try {
    const findUser = await User.findOne({ emailId });
    console.log(findUser);
    if (findUser) {
      return res.status(403).send({ message: "User already exist" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      emailId,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await user.save();
    const savedUser = await User.findById(user._id);
    res.send(savedUser);
  } catch (error) {
    console.log(error);
    genericError.unexpectedError(res, error);
  }
});

route.post("/signin", validate({ body: auth.signin }), async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId, deleted: false }).select(
      "+password"
    );
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword || !user) {
      return res.status(401).send({ message: "invalid username or password" });
    }
    const payload = {
      _id: user._id,
    };
    const token = jwt.sign(payload, process.env.tokenSecret);
    res.send({ token });
  } catch (error) {
    genericError.unexpectedError(res, error);
  }
});

module.exports = route;
