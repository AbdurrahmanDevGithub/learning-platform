import { useState } from 'react';
import CourseUplodeForm from '../components/CourseUplodeForm';
import { uploadCourse } from '../utils/tutor';

const CourseUplodePage = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false); // To track success or error messages

  const handleCourseUpload = async (data) => {
    try {
      const token = localStorage.getItem("auth-token"); // Ensure token key matches localStorage
      if (!token) {
        setMessage("You need to log in to upload a course.");
        setIsError(true);
        return;
      }

      const response = await uploadCourse(data, token);
      setMessage(response.msg || "Course uploaded successfully!");
      setIsError(false);
    } catch (error) {
      const errorMsg = error.message || "Failed to upload course.";
      setMessage(errorMsg);
      setIsError(true);
    }
  };



  return (
    <div>
      {/* <h1>Upload Course</h1> */}
      <CourseUplodeForm onSubmit={handleCourseUpload} />
    </div>
  );
};

export default CourseUplodePage;
