import { useState } from "react";
import { updateCourse } from "../utils/tutor";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import courseBG from '../assets/vecteezy_digital-marketing-3d-icon-illustration-for-your-website_11997005.png'
import BGImage from '../assets/smoke-376543.jpg'

const CourseUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { id: courseId } = useParams();

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    tutor: "",
    duration: "",
    description: "",
    image: null,
    video: null
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("tutor", formData.tutor);
    data.append("duration", formData.duration);
    data.append("description", formData.description);

    // Append image and video files if present
    if (formData.image) {
      data.append("image", formData.image);
    }
    if (formData.video) {
      data.append("video", formData.video);
    }

    try {
      const token = localStorage.getItem("token");

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
        <div className="flex-direction">
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
                  <option className="options" value="Health and Wellness">
                    Health and Wellness
                  </option>
                  <option className="options" value="Personal Development">
                    Personal Development
                  </option>
                  <option className="options" value="Languages">
                    Languages
                  </option>
                  <option className="options" value="Science and Mathematics">
                    Science and Mathematics
                  </option>
                  <option className="options" value="Humanities">
                    Humanities
                  </option>
                  <option className="options" value="Music">
                    Music
                  </option>
                  <option className="options" value="Programming">
                    Programming
                  </option>
                  <option className="options" value="Marketing">
                    Marketing
                  </option>
                  <option className="options" value="Finance and Accounting">
                    Finance and Accounting
                  </option>
                  <option className="options" value="Photography">
                    Photography
                  </option>
                  <option className="options" value="Cooking">
                    Cooking
                  </option>
                  <option className="options" value="Psychology">
                    Psychology
                  </option>
                  <option className="options" value="History">
                    History
                  </option>
                  <option className="options" value="Sports and Fitness">
                    Sports and Fitness
                  </option>
                  <option className="options" value="Writing and Literature">
                    Writing and Literature
                  </option>
                  <option className="options" value="Science and Mathematics">
                    Education
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
                  onChange={handleFileChange}
                />
              </label>

              <label className="form-label">
                Select Video:
                <input
                  className="form-file"
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleFileChange}
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
                  <span className="submitMessage">Course Update</span>
                )}
              </button>
            </form>
          </div>


          <div>
            <img src={courseBG} alt="Image" />
          </div>
        </div>

      </Container>
      <ToastContainer />

    </>
  );
};

export default CourseUpdate;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  flex-direction: column;
  position: absolute;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${BGImage});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      z-index: -1;
      background-attachment: fixed;  
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(255, 255, 255, 0.2); 
    border-radius: 1rem;
    padding: 2rem 6rem;
    max-width: 1200px;
    width: 900px;
    overflow-y: auto;
    top: 4rem;
    padding-top: -3rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
    padding-left: 2rem;
    box-shadow: none;

    .upload-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-top: -5rem;
      animation: fadeIn 1.2s ease-in-out; 

      .form-label {
        display: flex;
        flex-direction: column;
        font-size: 20px;
        font-weight: bold;
        animation: fadeIn 1.2s ease-in-out; 
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
        color: #ffffff;
        animation: fadeIn 1.2s ease-in-out; 
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
        border: 0.1rem solid #0202a1;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        animation: fadeIn 1.2s ease-in-out; 

        &:focus {
          border: 0.1rem solid #0202a1;
          outline: none;
        }
      }

      .button {
        background: linear-gradient(135deg, #3005a4, #0202a1);
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
        animation: fadeIn 1.2s ease-in-out; 

        &:hover {
          background: linear-gradient(135deg, #0202a1, #3005a4);
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

  .flex-direction {
  display: flex;
  flex-direction: row; 
  justify-content: center; 
  align-items: center; 
  gap: 10rem;
  
  img {
  width: 550px;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.7); 
  animation: fadeIn 1.2s ease-in-out; 
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


  @media (max-width: 1200px) {
    .form-container {
      width: 80%;
      padding: 1.5rem;
    }

    .flex-direction {
      flex-direction: column;
      gap: 2rem;
      align-items: flex-start;
    }

    .flex-direction img {
      width: 80%;
      max-width: 400px;
      height: auto;
    }
  }

  @media (max-width: 768px) {
    .form-container {
      width: 100%;
      padding: 1rem;
    }

    .flex-direction {
      flex-direction: column;
      gap: 1rem;
    }

    .flex-direction img {
      width: 100%;
      max-width: none;
      height: auto;
    }
  }

  @media (max-width: 480px) {
    .form-container {
      padding: 1rem;
      width: 100%;
    }

    .upload-form {
      gap: 0.5rem;
    }

    .form-label {
      font-size: 16px;
    }

    input,
    select {
      font-size: 16px;
      padding: 0.8rem;
    }

    .button {
      font-size: 12px;
      height: 35px;
      padding: 0 8px;
    }

    .flex-direction img {
      width: 100%;
      max-width: none;
      height: auto;
    }
  }
`;
