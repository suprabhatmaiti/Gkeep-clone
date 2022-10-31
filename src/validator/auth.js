const joi = require("joi");
const types = require("./types");

module.exports = {
  signup: joi.object({
    firstName: types.name.required(),
    lastName: types.name.required(),
    emailId: types.email.required(),
    gender: types.gender.required(),
    dateOfBirth: types.date.required(),
    password: types.password.required(),
  }),
  signin: joi.object({
    emailId: types.email.required(),
    password: types.password.required(),
  }),
};
