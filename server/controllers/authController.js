const User = require("../models/user");

const test = (req, res) => {
  res.json("Test is working");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if name is entered
    if (!name) {
      return res.json({
        error: "Name is required!",
      });
    }
    //Check for password
    if (!password) {
      return res.json({
        error: "Password is required",
      });
    } else if (password.length < 6) {
      return res.json({
        error: "Password should be atleast 6 characters long",
      });
    } else if (!/[0-9]/.test(password)) {
      return res.json({
        error: "Password should contain at least one numeric.",
      });
    } else if (!/[!@#$%^&*]/.test(password)) {
      return res.json({
        error: "Password should contain at least one special character.",
      });
    } else {
      next();
    }
    // check for email
    const exist = await User.findOne({ email }); // for the existence of the email in our database
    if (exist) {
      return res.json({
        error: "Email is already taken",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.json(user);
  } catch (error) {
    console.log("Error", error);
  }
}; //api endpoints methods

module.exports = {
  test,
  registerUser,
};
