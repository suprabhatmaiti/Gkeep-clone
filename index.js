const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 9000 || process.env.PORT;
const keys = require("./src/config/keys");

mongoose.connect(keys.mongoURI, () => {
  console.log("mongoose connection established");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`app is listening to the port ${PORT}`);
});
