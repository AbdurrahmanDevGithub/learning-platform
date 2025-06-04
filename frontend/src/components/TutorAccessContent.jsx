import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TutorAccessContent = () => {
  const token = useSelector((state) => state.auth.token); 

  const handleTutorAccess = async () => {
    try {
      const response = await axios.get('/api/tutor/fetchallcourses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data); 
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Access Denied: You don't have permission to access this page.");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <button onClick={handleTutorAccess}>Access Tutor Content</button> 
  );
};

export default TutorAccessContent;
