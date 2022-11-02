const joi = require("joi");
const types = require("./types");

module.exports = {
  update: joi.object({
    firstName: types.firstName.required(),
    lastName: types.lastName.required(),
    gender: types.gender.required(),
  }),
};
