const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 9000 || process.env.PORT;
require("./src/model");

mongoose.connect(process.env.mongoURI, null, (err) => {
  if (!err) {
    console.log("connected to mongodb");
  } else {
    console.log("not connected");
  }
});

app.use(express.json());
app.use("/", require("./src/routes"));

app.listen(PORT, () => {
  console.log(`app is listening to the port ${PORT}`);
});
