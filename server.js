//Require in modules
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

//Set the port to local host 3000 or heroku port
const PORT = process.env.PORT || 3000;

//Use express
const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const MONGODB_URL =
  "mongodb+srv://Cody-Admin:root@foo.bar.mongodb.net/budgettracker?retryWrites=true";

const mongoUrl = process.env.MONGODB_URL || "mongodb://localhost/budgettracker";
mongoose.connect(
  mongoUrl,
  // "mongodb+srv://Cody-Admin:root@foo.bar.mongodb.net/budgettracker?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
