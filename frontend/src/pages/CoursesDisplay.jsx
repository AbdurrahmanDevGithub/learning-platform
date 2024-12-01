import { useEffect, useState } from "react";
import { getCourses, deleteCourse } from "../utils/tutor";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import bgImage from "../assets/newBG.jpg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const FetcheCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("auth-token");

  const username = JSON.parse(localStorage.getItem('app-user'))?.username || "Guest";

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark"
  }


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourses(token);
        console.log("Fetch Courses: ", data);
        setCourses(data);
      } catch (error) {
        setError("Failed to load courses, please try again.", toastOptions);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [token]);

  const handleDelete = async (id) => {
    if (!id) {
        console.error("Course ID is undefined!");
        return;
    }
 
    try {
        const token = localStorage.getItem("auth-token");
        await deleteCourse(id, token);  // Make sure ID is passed properly here
        setCourses(courses.filter(course => course.id !== id)); // Optimistic deletion
        toast.success("Course deleted successfully!");
    } catch (error) {
        toast.error("Failed to delete course. Please try again.");
    }
  } 


  if (loading) {
    return <Container><p>Loading Courses...</p></Container>;
  }

  if (error) {
    return <Container><p>Error: {error}</p></Container>;
  }

  return (
    <>
    <Navbar />
    <Container>
      
      <h2>Well Come, {username} </h2>
      
      <div className="courses-wrapper">
        {Array.isArray(courses.data) && courses.data.length > 0 ? (
          courses.data.map((course, index) => (
            <div key={index} className="course-card">
              <img src={course.image.path} alt={course.title} className="course-image" />
              <h3 className="course-title">{course.title}</h3>
              <p className="course-title"><strong>Category:</strong> {course.category}</p>
              <p className="course-title"><strong>Tutor:</strong> {course.tutor}</p>
              <p className="course-title"><strong>Duration:</strong> {course.duration} hours</p>
              <p className="course-title"><strong>Description:</strong> {course.description}</p>
              <video controls className="course-video">
                <source src={course.video.path} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="course-actions">
                  <button className="update-button">Update</button>  
                  <button className="delete-button" onClick={() => handleDelete(course.id)}>Delete</button>

                  {/* onClick={() => handleUpdate(course.id)} */}
                </div>

            </div>
          ))
        ) : (
          <p>No courses available or loading...</p>
        )}
      </div>
    </Container>
    <ToastContainer/>
    </>
  );
};

const Container = styled.div`
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; 
  margin: 0; 

  h2 {
    color: #ccc;
    margin-left: -1200px;
  }

  .courses-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
    width: 100%;
    padding: 20px;
    overflow-y: auto;
    max-height: calc(100vh - 160px); 
    scrollbar-width: thin;
    scrollbar-color: #01011b #222;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #01011b;
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
      background: #01011b;
    }
  }

  .course-card {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    color: #ccc;
    padding: 30px;
    width: 250px;
    text-align: center;
    background-color: transparent; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;
    backdrop-filter: blur(40px); 
    z-index: 1;

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

    .course-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      font-weight: bold;
    }

    .course-title {
      color: #ccc;
      margin: 10px 0;
    }

    p {
      color: #555;
      margin: 5px 0;
    }

    .course-video {
      width: 100%;
      height: auto;
      margin-top: 10px;
      border-radius: 8px;
    }
    .course-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;

      .update-button, .delete-button {
        background-color: #053406;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #45a049;
        }

        &.delete-button {
          background-color: #3b0703;

          &:hover {
            background-color: #da190b;
          }
        }
  }
}
  }
`;

export default FetcheCourses;
