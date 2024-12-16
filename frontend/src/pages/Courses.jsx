import axios from 'axios'
import React, { useState } from 'react'
import { host } from '../utils/APIRoutes'
import { toast,ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar'
import { TextField, Box } from "@mui/material";

const Courses = () => {

  const [courses,setCourses] = useState([])

  const categories = [
      "Engineering",
      "Technology",
      "Business",
      "Art and Design",
      "Health and Wellness",
      "Personal Development",
      "Languages",
      "Science and Mathematics",
      "Humanities",
      "Music",
      "Programming",
      "Marketing",
      "Finance and Accounting",
      "Photography",
      "Cooking",
      "Psychology",
      "History",
      "Sports and Fitness",
      "Writing and Literature",
      "Education"
    ]

    const handleClickedCourse = async(category)=>{
      try{      
      
          const response = await axios.get(`${host}/api/course/fetchallcourses/${category}`)
          if(response.data && response.data.length > 0){
            setCourses(response.data)
            console.log(response.data);
          }else{
            toast.error(`Sorry! currently no courses available on ${category} category.`);
            console.log("there is no courses on this category");
          }
            
      }catch (error) {
        if (error.response && error.response.status === 404) {
            toast.error(`No courses found in the ${category} category.`);
        } else if (error.response && error.response.status === 500) {
            toast.error('Internal server error. Please try again later.');
        } else {
            toast.error('An unexpected error occurred.');
        }

        console.error('Error fetching courses:', error);
    }
    }

    const enroleCourse = async(courseId,tutorId,category,image)=>{
      try{
        const token = localStorage.getItem('token')
        if(!token){
          toast.error("You need to login to enrole courses")
          return null;
        }

        const enrolement = await axios.post(
          `${host}/api/user/enrollcourse/${courseId}/${tutorId}/${category}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if(!enrolement){
          toast.error("There is an problem in Enrole this course. Please try again later")
          return null;
        }

        console.log("Successfully Enrolled.",enrolement.data);
        toast.error("Successfully Enrolled")

      }catch(error){
        console.log("error in enroleCourse",error);
        
      }
    }
 
  return (
    <div>
      <Navbar />
      <Box sx={{ padding: "20px", display: "flex", justifyContent: "center" }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: "600px" }}
        />
      </Box>
      <div>

        {categories.map((category)=>(
          <li key={category}>
            <span onClick={()=>handleClickedCourse(category)}>
             {category}
            </span>
          </li>
        ))}
      </div>

        <br/>

      <div>
        {
          courses.map((course)=>(
            <div key={course._id}>
              <h2>{course.title}</h2>
                <p>{course.description}</p>
                <img
                  src={course.image}
                  alt={course.title}
                  className="course-image"
                />
                <video
                  controls
                  className="course-video"
                  src={course.video}
                >
                  Your browser does not support the video tag.
                </video>
                <p>
                  <strong>Category:</strong> {course.category}
                </p>
                <p>
                  <strong>Tutor:</strong> {course.tutor}
                </p>
                <p>
                  <strong>Duration:</strong> {course.duration} hours
                </p>
                <button onClick={()=>enroleCourse(course._id,course.tutorId,course.category)}> Add to Favourite </button>
            </div>
          ))
        }
      </div>
  <ToastContainer />
  </div>
  )
}

export default Courses