import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Coursecreation() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    courseTitle: "",
    courseCatg: "",
    courseDesc: "",
    coursePrice: "",
    courseSCprice: "",
  });

  const coursecreate = async (e) => {
    e.preventDefault();
    const { courseTitle, courseDesc, courseCatg, coursePrice, courseSCprice } =
      data;

    if (
      !courseTitle ||
      !courseDesc ||
      !courseCatg ||
      !coursePrice ||
      !courseSCprice
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post("/create-course", {
        courseName,
        courseDesc,
      });
      const result = response.data;

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Course created successfully!");
        setData({ courseName: "", courseDesc: "" });
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center mb-4">
        <h3 className="fw-bold" style={{ whiteSpace: "nowrap" }}>
          Create a <span className="highlight">New Course</span>
        </h3>
      </div>

      <div className="course-creation-container">
        <form className="form-container" onSubmit={coursecreate}>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="courseName"
              placeholder="Course Name"
              required
              value={data.courseName}
              onChange={(e) => setData({ ...data, courseName: e.target.value })}
            />
            <label htmlFor="courseName">Course Name</label>
          </div>

          <div className="form-floating mb-4">
            <textarea
              className="form-control"
              id="courseDesc"
              placeholder="Course Description"
              required
              value={data.courseDesc}
              onChange={(e) => setData({ ...data, courseDesc: e.target.value })}
              style={{ height: "150px" }}
            ></textarea>
            <label htmlFor="courseDesc">Course Description</label>
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Create Course
          </button>

          <p className="mt-3">
            Back to Dashboard?{" "}
            <Link to="/dashboard" className="text-decoration-none">
              Go Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
