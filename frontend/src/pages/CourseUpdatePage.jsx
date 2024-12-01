import { useState } from "react";
import { updateCourse } from "../utils/tutor";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import bgImage from "../assets/newBG.jpg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const CourseUpdate = () => {

  const [loading, setLoading] = useState(false);

  const { id: courseId } = useParams();

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    tutor: "",
    duration: "",
    description: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark"
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("tutor", formData.tutor);
    data.append("duration", formData.duration);
    data.append("description", formData.description);

    try {
      const token = localStorage.getItem("auth-token");

      if (!token) {
        toast.error("You must be logged in to update a course!", toastOptions);
        return;
      }
      const response = await updateCourse(courseId, data, token);
      console.log("Course Updated Successfully!", response);
      toast.success("Course updated successfully!", toastOptions);
    } catch (error) {
      console.log("Error updating courses", error);
      toast.error("Error updating course. Please try again!", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="form-container">
          <form className="upload-form" onSubmit={handleSubmit}>
            {/* Input fields */}
            <label className="form-label">
              Category:
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option className="options" value="">
                  Select Category
                </option>
                <option className="options" value="Engineering">
                  Engineering
                </option>
                <option className="options" value="Technology">
                  Technology
                </option>
                <option className="options" value="Business">
                  Business
                </option>
                <option className="options" value="Art and Design">
                  Art and Design
                </option>
              </select>
            </label>

            <label className="form-label">
              Title:
              <input
                className="form-input"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Tutor:
              <input
                className="form-input"
                type="text"
                name="tutor"
                value={formData.tutor}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Duration:
              <input
                className="form-input"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Description:
              <input
                className="form-input"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Select Image:
              <input
                className="form-file"
                type="file"
                name="image"
                accept="image/*"
                // onChange={handleFileChange}
              />
            </label>

            <label className="form-label">
              Select Video:
              <input
                className="form-file"
                type="file"
                name="video"
                accept="video/*"
                // onChange={handleFileChange}
              />
            </label>

            <button className={`button ${loading ? "loading" : ""}`} type="submit">
              {loading ? (
                <svg
                  className="spinner"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <circle
                    className="path"
                    cx="50"
                    cy="50"
                    r="45"
                    strokeWidth="10"
                    stroke="#fff"
                    strokeDasharray="283"
                    strokeDashoffset="75"
                  ></circle>
                </svg>
              ) : (
                <span className="submitMessage">Upload File</span>
              )}
            </button>
          </form>
        </div>
      </Container>
      <ToastContainer/>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(5px); /* Blur effect */
    z-index: -1;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent background */
    border-radius: 1rem;
    padding: 2rem 2rem;
    max-width: 900px;
    width: 100%;
    overflow-y: auto;

    /* Remove shadow by ensuring no box-shadow applied */
    box-shadow: none;

    .upload-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .form-label {
        display: flex;
        flex-direction: column;
        font-size: 20px;
        font-weight: bold;
      }

      .form-select,
      .form-input,
      .form-file {
        width: auto;
        padding: 1px;
        margin-top: 0.1rem;
        border-radius: 0.3rem;
        border: 1px solid #444;
        font-size: 18px;
      }

      .form-select {
        background-color: #666;
        color: #ffffff;
      }

      .options {
        background-color: #666;
        color: #ffffff;
      }

      input {
        background-color: #666;
        padding: 1rem;
        border: 0.1rem solid #3005a4;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;

        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }

      .button {
        background: linear-gradient(135deg, #3005a4, #997af0);
        border: none;
        color: #ffffff;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        height: 40px;
        padding: 0 10px;
        border-radius: 0.5rem;
        outline: none;
        position: relative;
        transition: background 0.3s ease, transform 0.2s ease;

        &:hover {
          background: linear-gradient(135deg, #997af0, #3005a4);
          transform: scale(1.05);
        }

        &:active {
          transform: scale(0.95);
        }

        &.loading {
          background: linear-gradient(135deg, #666, #444);
          pointer-events: none;

          .spinner {
            animation: spin 1s linear infinite;
          }
        }

        .spinner {
          width: 20px;
          height: 20px;
        }

        .submitMessage {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
      }
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;


export default CourseUpdate;
