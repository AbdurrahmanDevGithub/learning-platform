import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { host } from "../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BGImage from "../assets/smoke-376543.jpg";
import {jwtDecode} from "jwt-decode"; // Correct import

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const handleViewCourseDetails = async (course_id) => {
    try {
      navigate(`/viewcoursedetails/${course_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to access this page");
          navigate("/");
          return;
        }
  
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
  
        if (userRole !== "tutor") {
          toast.error("You do not have access to this page");
          return; // Ensure the function exits here
        }
  
        const response = await axios.get(`${host}/api/user/mycourses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API response:", response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        if (error.response && error.response.status === 404) {
          toast.error("No courses found for this user!");
        } else if (error.response && error.response.status === 500) {
          toast.error("Internal server error");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    };
  
    fetchMyCourses();
  }, [navigate]);
  

  return (
    <div
      style={{
        backgroundImage: `url(${BGImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box sx={{ padding: 15 }}>
        <Typography variant="h4" gutterBottom>
          My Courses
        </Typography>
        <TableContainer
          component={Paper}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Image</TableCell>
                <TableCell>Course Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(courses) &&
                courses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell>
                      <img
                        src={`http://localhost:3001/image/${course.image}`}
                        alt={course.title}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewCourseDetails(course._id)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default MyCourses;
