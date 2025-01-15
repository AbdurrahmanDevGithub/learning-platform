import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TutorAccessContent = () => {
  const token = useSelector((state) => state.auth.token); // Retrieve token at the top level

  const handleTutorAccess = async () => {
    try {
      const response = await axios.get('/api/tutor/fetchallcourses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data); // Handle the response to show courses or any tutor content
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Access Denied: You don't have permission to access this page.");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <button onClick={handleTutorAccess}>Access Tutor Content</button> // Trigger access
  );
};

export default TutorAccessContent;
