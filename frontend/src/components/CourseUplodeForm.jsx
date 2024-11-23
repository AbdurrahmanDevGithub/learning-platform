import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import bgImage from '../assets/courseBG.png';

const CourseUploadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    tutor: '',
    duration: '',
    description: ''
  });

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (e.target.name === 'image') {
      setImage(file);
    }

    if (e.target.name === 'video') {
      setVideo(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    if (image) {
      data.append('image', image);
    }

    if (video) {
      data.append('video', video);
    }

    onSubmit(data);

    // Simulate form submission
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Container>
      <div className="form-container">
        <form className="upload-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Category:
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Engineering">Engineering</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Art and Design">Art and Design</option>
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

          <button className={`button ${loading ? 'loading' : ''}`} type="submit">
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
  );
};

CourseUploadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

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
    filter: blur(8px);
    z-index: -1;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    max-height: 80%;
    overflow-y: auto;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);

    .upload-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

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

export default CourseUploadForm;
