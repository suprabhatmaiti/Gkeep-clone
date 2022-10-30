const { Schema, model } = require("mongoose");
const { Types } = Schema;

const textSchema = new Schema({
  noteId: { type: Types.ObjectId, ref: "Note" },
  text: Types.String,
});
