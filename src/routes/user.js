const express = require("express");
const { model } = require("mongoose");
const route = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const genericError = require("../utils/genericError");
const { user, validate } = require("../validator");
const User = model("User");

route.get("/", isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select("+deleted");
    if (user.deleted) {
      return genericError.userNotFound(res);
    }
    res.send(user);
  } catch (error) {
    genericError.unexpectedError(res, error);
  }
});

route.patch("/", isLoggedIn, validate({ body: user.update }), (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, gender } = req.body;
  try {
    const user = User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        updatedAt: new Date(),
      },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    genericError.unexpectedError(res, error);
  }
});

route.delete("/", isLoggedIn, (req, res) => {
  const userId = req.user._id;
  try {
    User.findOneAndUpdate(userId, {
      deleted: true,
      deletedAt: new Date(),
    });
    res.send({ message: "User successfully deleted" });
  } catch (error) {
    genericError.unexpectedError(res, error);
  }
});
module.exports = route;
