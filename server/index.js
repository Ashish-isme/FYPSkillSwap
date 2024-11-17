const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

mongoose
  .connect(process.env.MONGO_URL) // database connection
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Data connection error", err));

//creating middleware for conn
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
