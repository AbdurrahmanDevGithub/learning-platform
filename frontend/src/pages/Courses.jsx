import axios from "axios";
import React, { useState } from "react";
import { host } from "../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import bgImage from "../assets/newBG.jpg";
import { TextField, Box, Typography, Button, List, ListItem, Card, CardContent, CardMedia, Grid, CircularProgress } from "@mui/material";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

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
    "Education",
  ];

  const handleClickedCourse = async (category) => {
    setLoading(true); // Show loading spinner
    try {
      const response = await axios.get(`${host}/api/course/fetchallcourses/${category}`);
      if (response.data && response.data.length > 0) {
        setCourses(response.data);
      } else {
        toast.error(`Sorry! currently no courses available in ${category} category.`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error(`No courses found in the ${category} category.`);
      } else if (error.response && error.response.status === 500) {
        toast.error("Internal server error. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
    setLoading(false); // Hide loading spinner
  };

  const enroleCourse = async (courseId, tutorId, category) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to login to enroll in courses");
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

      if (!enrolement) {
        toast.error("There is a problem enrolling in this course. Please try again later.");
        return null;
      }

      toast.success("Successfully Enrolled");
    } catch (error) {
      toast.error("An error occurred while enrolling in the course.");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <Navbar />
      
      <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
        <TextField label="Search" variant="outlined" fullWidth sx={{ maxWidth: "600px" }} />
      </Box>

      <Box sx={{ display: "flex" }}>
        {/* Categories Sidebar */}
        <Box sx={{ width: "250px", padding: 2, backgroundColor: "rgba(255, 255, 255, 0.6)", backdropFilter: "blur(10px)",  borderRadius: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Categories</Typography>
          <List>
            {categories.map((category) => (
              <ListItem key={category}>
                <Button variant="contained" fullWidth onClick={() => handleClickedCourse(category)}>
                  {category}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Courses Grid */}
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {courses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course._id}>
                  <Card sx={{ transition: "transform 0.3s ease, box-shadow 0.3s ease", '&:hover': { transform: "scale(1.05)", boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }, }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={course.image}
                      alt={course.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.description}
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        <strong>Category:</strong> {course.category}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Tutor:</strong> {course.tutor}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Duration:</strong> {course.duration} hours
                      </Typography>
                      {course.video && (
                        <Box sx={{ marginTop: 2 }}>
                          <video controls width="100%">
                            <source src={course.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </Box>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ marginTop: 2 }}
                        onClick={() => enroleCourse(course._id, course.tutorId, course.category)}
                      >
                        Add to Favourite
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      <ToastContainer />
    </div>
  );
};

export default Courses;
