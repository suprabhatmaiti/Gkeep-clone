const { Schema, model } = require("mongoose");
const { Types } = Schema;

const typeSchema = new Schema({
  name: Types.String,
});

module.exports = typeSchema;
