import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { host } from '../utils/APIRoutes'
import { toast } from 'react-toastify'

const MyCourses = () => {

  const [courses,setCoureses] = useState([])
  
  useEffect(()=>{
    const fetchMyCourses = async()=>{
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${host}/api/user/mycourses`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        setCoureses(response.data)
        console.log(response);
      } catch (error) {
        if(error.response & error.response.status === 404){
          toast.error("No courses found on this id!")
        }else if(error.response & error.response.status === 500){
          toast.error("Internal server error")
        }else {
          toast.error("An unexpected error occurred");
          console.log("An unexpected error occurred", error);
        }
      }
    }
    fetchMyCourses()
  },[])
  
  return (
    <div>
      <div>
        <div>
          {courses.map((course)=>(
            <div key={course._id}>
            <h2>{course.title}</h2>
            
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyCourses