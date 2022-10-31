const Joi = require("joi");

module.exports = {
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(8).max(26).lowercase(1).uppercase(1),
  name: Joi.string().min(3).max(30),
  gender: Joi.string().valid("M", "F", "O"),
  date: Joi.date(),
};
