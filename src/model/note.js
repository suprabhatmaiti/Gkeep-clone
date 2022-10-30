const { Schema, model } = require("mongoose");
const { Types } = Schema;
const typeSchema = require("./type");

const noteSchema = new Schema({
  type: typeSchema,
  data: [],
});

model("Note", noteSchema);
