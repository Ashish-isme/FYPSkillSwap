import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function CourseCreation() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    courseTitle: "",
    courseCatg: "",
    courseDesc: "",
    coursePrice: "",
    courseSCprice: "",
  });

  const courseCreate = async (e) => {
    e.preventDefault();

    const { courseTitle, courseCatg, courseDesc, coursePrice, courseSCprice } =
      data;

    if (
      !courseTitle ||
      !courseCatg ||
      !courseDesc ||
      !coursePrice ||
      !courseSCprice
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post("/create-course", {
        courseTitle,
        courseCatg,
        courseDesc,
        coursePrice: parseInt(coursePrice), // ParseInt
        courseSCprice: parseInt(courseSCprice),
      });

      const result = response.data;

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Course created successfully!");
        setData({
          courseTitle: "",
          courseCatg: "",
          courseDesc: "",
          coursePrice: "",
          courseSCprice: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Create a New Course</h3>
      <form onSubmit={courseCreate} style={{ width: "300px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="courseTitle"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Course Title
          </label>
          <input
            type="text"
            id="courseTitle"
            value={data.courseTitle}
            onChange={(e) => setData({ ...data, courseTitle: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="courseCatg"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Course Category
          </label>
          <input
            type="text"
            id="courseCatg"
            value={data.courseCatg}
            onChange={(e) => setData({ ...data, courseCatg: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="courseDesc"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Course Description
          </label>
          <textarea
            id="courseDesc"
            value={data.courseDesc}
            onChange={(e) => setData({ ...data, courseDesc: e.target.value })}
            required
            style={{
              width: "100%",
              height: "80px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          ></textarea>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="coursePrice"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Course Price
          </label>
          <input
            type="number"
            id="coursePrice"
            value={data.coursePrice}
            onChange={(e) => setData({ ...data, coursePrice: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="courseSCprice"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Skill Coin Needed
          </label>
          <input
            type="number"
            id="courseSCprice"
            value={data.courseSCprice}
            onChange={(e) =>
              setData({ ...data, courseSCprice: e.target.value })
            }
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create Course
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Back to Dashboard?{" "}
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "#007BFF" }}
          >
            Go Here
          </Link>
        </p>
      </form>
    </div>
  );
}
