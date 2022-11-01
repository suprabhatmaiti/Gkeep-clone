const { model, Schema } = require("mongoose");
const { Types } = Schema;

const userSchema = new Schema({
  firstName: Types.String,
  lastName: Types.String,
  dateOfBirth: Types.Date,
  gender: Types.String,
  emailId: Types.String,
  password: { type: Types.String, select: false },
  deleted: { type: Types.Boolean, default: false, select: false },
  createdAt: { type: Types.Date, select: false },
  updatedAt: { type: Types.Date, select: false },
  deletedAt: { type: Types.Date, select: false },
});

model("User", userSchema);
