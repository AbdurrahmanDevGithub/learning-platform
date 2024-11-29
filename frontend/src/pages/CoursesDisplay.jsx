import { useEffect, useState } from 'react';
import { getCourses } from '../utils/tutor';

const CourseDisplayPage = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        setMessage("You need to log in to view courses");
        setIsError(true);
        return;
      }
  
      const response = await getCourses(token);
      console.log('Fetched courses:', response);  
  
      // Example: If the response is nested under a "data" field
      if (response && response.data && response.data.courses) {
        setCourses(response.data.courses);
        setIsError(false);
      } else {
        setMessage("No courses found");
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setMessage("Failed to fetch courses");
      setIsError(true);
    }
  };
  
  
  
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h1>All Courses</h1>
      {message && (
        <p style={{ color: isError ? "red" : "green" }}>{message}</p>
      )}
       
  <ul>
    {courses.map((course) => (
      <li key={course._id}>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        {course.image && <img src={course.image} alt="course" />}
        {course.video && <video src={course.video} controls />}
      </li>
    ))}
  </ul>

    </div>
  );
};

export default CourseDisplayPage;
