import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { host } from "../utils/APIRoutes";
import { toast } from "react-toastify";
import axios from 'axios';
import Navbar from "../components/Navbar";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${host}/api/user/mycourses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("No courses found for this user!");
        } else if (error.response && error.response.status === 500) {
          toast.error("Internal server error");
        } else {
          toast.error("An unexpected error occurred");
          console.log("An unexpected error occurred", error);
        }
      }
    };
    fetchMyCourses();
  }, []);

  return (
    <div style={{ background: 'linear-gradient(#87CEFA, #B0C4DE)', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Courses
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Image</TableCell>
                <TableCell>Course Title</TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>
                    <img
                      src={course.image || "/default-course-image.jpg"}
                      alt={course.title}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default MyCourses;
