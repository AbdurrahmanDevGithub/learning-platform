import { useState } from "react";
import { updateCourse } from "../utils/tutor";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import styled from "styled-components";

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
      [name]: files[0], // Assuming only one file is selected
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
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Label>
            Category:
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <Option value="">Select Category</Option>
              <Option value="Engineering">Engineering</Option>
              <Option value="Technology">Technology</Option>
              <Option value="Business">Business</Option>
              <Option value="Art and Design">Art and Design</Option>
            </Select>
          </Label>

          <Label>
            Title:
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Label>

          <Label>
            Tutor:
            <Input
              type="text"
              name="tutor"
              value={formData.tutor}
              onChange={handleChange}
            />
          </Label>

          <Label>
            Duration:
            <Input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </Label>

          <Label>
            Description:
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Label>

          <Label>
            Select Image:
            <FileInput
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Label>

          <Label>
            Select Video:
            <FileInput
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
            />
          </Label>

          <SubmitButton className={loading ? "loading" : ""} type="submit">
            {loading ? (
              <Spinner xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
                <Circle cx="50" cy="50" r="45" strokeWidth="10" stroke="#fff" strokeDasharray="283" strokeDashoffset="75" />
              </Spinner>
            ) : (
              <SubmitText>Upload File</SubmitText>
            )}
          </SubmitButton>
        </Form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default CourseUpdate;

// Styled Components
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Option = styled.option`
  padding: 10px;
`;

const FileInput = styled.input`
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  &:hover {
    background: #45a049;
  }
  &.loading {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const Spinner = styled.svg`
  width: 30px;
  height: 30px;
  animation: rotate 2s linear infinite;
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Circle = styled.circle`
  fill: none;
  stroke: #fff;
  stroke-width: 10;
  stroke-dasharray: 283;
  stroke-dashoffset: 75;
`;

const SubmitText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
