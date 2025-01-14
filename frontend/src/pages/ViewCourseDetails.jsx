import React, { useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewCourseDetails = () => {
  const {course_id} = useParams()

  useEffect(()=>{
    const fetchCourseDetails = async()=>{
      try{
        const token = localStorage.getItem('token')
        if(!token){{
          toast.error("You need to signin first")
          return;
        }}
        console.log(course_id);
        
        const response = await axios.get(`http://localhost:3001/api/course/viewcoursedetails/${course_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });        
        console.log(response.data);
      }catch(error){
        console.log(error);
      }
    }
      fetchCourseDetails()
  },[course_id])

  return (
    <div>ViewCourseDetails</div>
  )
}

export default ViewCourseDetails