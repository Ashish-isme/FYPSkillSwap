import React from "react";
import "../styles/FeaturedClasses.css"; // Create a CSS file for styling

const FeaturedClasses = () => {
  // Example data (replace this with API data or props later)
  const classes = [
    {
      id: 1,
      image: "https://via.placeholder.com/300", // Replace with actual image URLs
      badge: "Staff Pick",
      title:
        "Social Media Content Creation in Canva: From Beginner to Advanced",
      students: "34,316 students",
      duration: "7h 56m",
      instructor: "Maggie Stara",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300",
      badge: "Staff Pick",
      title: "Canva Design Essentials",
      students: "217 students",
      duration: "7h 20m",
      instructor: "Daniel Scott",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300",
      badge: "",
      title: "Graphic Design Masterclass: Learn GREAT Design",
      students: "44,892 students",
      duration: "19h 59m",
      instructor: "Lindsay Marsh",
    },
  ];

  return (
    <div className="featured-classes">
      <h2>Featured Classes</h2>
      <div className="class-cards">
        {classes.map((item) => (
          <div key={item.id} className="class-card">
            <div className="class-image">
              <img src={item.image} alt={item.title} />
              {item.badge && <span className="badge">{item.badge}</span>}
            </div>
            <div className="class-content">
              <p className="students">{item.students}</p>
              <p className="duration">{item.duration}</p>
              <h3 className="title">{item.title}</h3>
              <p className="instructor">{item.instructor}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedClasses;
