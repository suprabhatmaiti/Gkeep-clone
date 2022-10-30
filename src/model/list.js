const { text } = require("express");
const { Schema, model } = require("mongoose");
const { Types } = Schema;

const listSchema = new Schema({
  noteId: { type: Types.ObjectId, ref: "Note", unique: true },
  text: Types.String,
  checked: { type: Types.Boolean },
});
