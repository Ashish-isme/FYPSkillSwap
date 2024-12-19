const { hashPassword, comparePassword } = require("../helpers/auth");
const User = require("../models/user");
const Course = require("../models/course");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    // Checking conditions

    if (!name) {
      return res.json({ error: "Name field is empty" });
    }

    if (!password) {
      return res.json({ error: "Password is required." });
    }

    if (password.length < 6) {
      return res.json({
        error: "Password must be at least 6 characters long.",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.json({
        error: "Password must contain at least one uppercase letter.",
      });
    }

    if (!/\d/.test(password)) {
      return res.json({
        error: "Password must contain at least one number.",
      });
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return res.json({
        error:
          "Password must contain at least one special character (e.g., !@#$%^&*).",
      });
    }

    // Checking if the user already exists in the database
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email is already taken" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    // Check if password matches
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.json({
        error: "Incorrect Password!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Profile Endpoint
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null); //JWT tokn storage .
  }
};

//Course Creation Enndpoint // Ask question to sir here, about whether all the backend functionality should be kept at the same place.
const createCourse = async (req, res) => {
  try {
    const { courseTitle, courseCatg, courseDesc, coursePrice, courseSCPrice } =
      req.body;

    // Checking if the course title is already taken
    const exist = await Course.findOne({ courseTitle });
    if (exist) {
      return res.json({ error: "Course Name is already taken" });
    }

    const course = await Course.create({
      courseTitle,
      courseCatg,
      courseDesc,
      coursePrice,
      courseSCPrice,
    });
  } catch (error) {
    console.error("Error creating course:", error.message);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ error: messages.join(", ") });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  createCourse,
};
