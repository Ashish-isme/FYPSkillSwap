const mongoose = require("mongoose");
const { schema } = mongoose;

const userSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
  },
  courseCatg: {
    type: String,
  },
  courseDesc: {
    type: String,
  },
  coursePrice: {
    type: Number,
  },
  courseSCprice: {
    type: Number,
  },
});

const CourseModel = mongoose.model("Course", userSchema);

module.exports = CourseModel;
