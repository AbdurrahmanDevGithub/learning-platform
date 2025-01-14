import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses, deleteCourse } from "../utils/tutor";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import BGImage from "../assets/smoke-376543.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FetcheCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "Guest";

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
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== id)
        );
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

        <h1>Welcome, <span>{username}!</span></h1>
        <div className="courses-container">
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course) => (
              <div className="course-card" key={course._id}>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <img
                  src={`http://localhost:3001/image/${course.image}`}
                  alt={course.title}
                  className="course-image"
                />
                <video
                  src={`http://localhost:3001/video/${course.video}`}
                  className="course-video"
                  controls
                  type="video/mp4" 
                >
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
  padding: 8rem 4rem 4rem;
  margin-top: 0;
  background-image: url(${BGImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    position: absolute;
    top: 10rem;
    left: 12rem;
    margin: 0;
    color: white;
    animation: fadeInUp 0.8s ease-out forwards;

    span{
      color: #0505bd;
    }
  }

  .courses-container {
    top: 15rem;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    width: 100%;
    max-height: 70vh;
    overflow-y: auto;
    padding: 1rem;
  }

  .courses-container::-webkit-scrollbar {
    width: 8px;
  }

  .courses-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  .courses-container::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .course-card {
    background-color: rgba(173, 216, 230, 0.5);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    border: 1px solid black;
    transition: transform 0.3s ease;
    backdrop-filter: blur(40px);
    z-index: 1;
    border-radius: 10px;
    padding: 2rem;
    width: 300px;
    color: #ddd;
    

    &:hover {
      transform: scale(1.05);
    }

    h2 {
      margin-bottom: 0.5rem;
      color: black;
    }

    p {
      margin: 0.3rem 0;
      color: black;
    }

    .course-image {
      width: 50px;
      height: auto;
      border-radius: 10px;
      margin: 0.5rem 0;
    }

    .course-video {
      width: 100%;
      height: auto;
      max-height: 200px;
      margin: 0.5rem 0;
      border-radius: 10px;
      object-position: cover;
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