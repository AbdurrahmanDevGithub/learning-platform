import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { host } from "../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BGImage from "../assets/smoke-376543.jpg";
import { jwtDecode } from "jwt-decode";
import Footer from "../components/Footer";

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
    
        const response = await axios.get(`${host}/api/user/mycourses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        // Check the response thoroughly
        console.log("API response:", response);
    
        if (response.data && response.data.length === 0) {
          toast.error("You have not added any courses to this");
        } else {
          setCourses(response.data);
        }
    
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
    <>
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
        <Box sx={{ padding: 23 }}>
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
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Course Image</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Course Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "20px", color: "white" }}>Actions</TableCell>
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
                      <TableCell sx={{ fontSize: "15px", color: "white" }}>{course.title}</TableCell>
                      <TableCell sx={{ fontSize: "15px", color: "white" }}>{course.category}</TableCell>
                      <TableCell sx={{ fontSize: "15px", color: "white" }}>
                        <Button
                          variant="contained"
                          onClick={() => handleViewCourseDetails(course._id)}

                          sx={{
                            background: "linear-gradient(135deg, white, #a69090)",
                            color: "navy",
                            "&:hover": {
                              background: "linear-gradient(135deg, navy, #0505f1)",
                              color: "white",
                              transform: "scale(1.05)",
                              transition: "all 0.3s ease",
                            },
                          }}
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
        
        <Footer />
        <ToastContainer />
      </div>

    </>
  );
};

export default MyCourses;
