import React, { useState } from 'react';
import CourseUplodeForm from '../components/CourseUplodeForm';
import { uploadCourse } from '../utils/tutor';

const CourseUplodePage = () => {
    
    const [message, setMessage] = useState("");
  
    const handleCourseUpload = async (data) => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await uploadCourse(data, token);
        setMessage(response.msg || "Course uploaded successfully!");
      } catch (error) {
        setMessage(error || "Failed to upload course.");
      }
    };
  
    return (
      <div>
        {/* <h1>Upload Course</h1> */}
        <CourseUplodeForm onSubmit={handleCourseUpload} />
        {message && <p>{message}</p>}
      </div>
    );
  };
  

export default CourseUplodePage
