import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, deleteCourse } from "../utils/tutor";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import bgImage from "../assets/newBG.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FetcheCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("auth-token");
  const username = JSON.parse(localStorage.getItem("app-user"))?.username || "Guest";

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourses(token);
        console.log("Fetch Courses: ", data);

        // Ensure `data` is an array before updating state
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setCourses(data.data);
        } else {
          throw new Error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses, please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id, token);
        toast.success("Course deleted successfully!", toastOptions);

        // Update the state to remove the deleted course
        setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
        toast.error("Failed to delete the course. Please try again.", toastOptions);
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <p>Loading Courses...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>Error: {error}</p>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Container>
  <h1>Welcome, {username}!</h1>
  <div className="courses-container">
    {Array.isArray(courses) && courses.length > 0 ? (
      courses.map((course) => (
        <div className="course-card" key={course._id}>
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          {/* Updated Image */}
          <img
            src={`data:image/jpeg;base64,${course.image?.content}`}
            alt={course.title}
            className="course-image"
          />
          {/* Updated Video */}
          <video controls className="course-video" 
            src={`http://localhost:3001/uploads/videos/${course.video?.filename}`}>
              Your browser does not support the video tag.
          </video>
          <p>
            <strong>Category:</strong> {course.category}
          </p>
          <p>
            <strong>Tutor:</strong> {course.tutor}
          </p>
          <p>
            <strong>Duration:</strong> {course.duration} hours
          </p>
          <div className="course-actions">
            <Link to={`/updatecourse/${course._id}`}>
              <button className="button">Edit</button>
            </Link>
            <button
              className="button delete-button"
              onClick={() => handleDelete(course._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))
    ) : (
      <p>No courses available.</p>
    )}
  </div>
</Container>

    </>
  );
};

const Container = styled.div`
  padding: 2rem;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;

  h1 {
    color: #fff;
    text-align: center;
    margin-bottom: 2rem;
  }

  .courses-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }

  .course-card {
    background-color: transparent; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid #ccc;
    transition: transform 0.3s ease;
    backdrop-filter: blur(40px); 
    z-index: 1;
    border-radius: 10px;
    padding: 1rem;
    width: 300px;
    color: #ddd;

    &:hover {
      transform: scale(1.05);
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: inherit;
      filter: blur(50px);
      z-index: -1;
    }    

    h2 {
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0.3rem 0;
    }

    .course-image {
      width: 100%;
      height: auto;
      border-radius: 5px;
      margin: 0.5rem 0;
    }

    .course-video {
      width: 100%;
      margin: 0.5rem 0;
      border-radius: 5px;
    }

    .course-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;

      .button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background: #ddd;
        }

        &.delete-button {
          background: #ff5555;
          color: #fff;

          &:hover {
            background: #ff0000;
          }
        }
      }
    }
  }
`;

export default FetcheCourses;
