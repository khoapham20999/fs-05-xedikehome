const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./route/api/user");
const tripRouter = require("./route/api/trip");
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0-izjvl.mongodb.net/xedike?retryWrites=true&w=majority",
    //"mongodb://localhost:27017/xedikehome",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch(err => {
    console.log(err);
  });

const app = express();
const port = process.env.PORT || 4000; // process.env.PORT

app.use("/", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/trip", tripRouter);

app.listen(port, () => {
  console.log("app is listening on port ", port);
});
