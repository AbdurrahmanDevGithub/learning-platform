import axios from "axios";
import React, { useState } from "react";
import { host } from "../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import SearchIcon from '@mui/icons-material/Search';
import BGImage from '../assets/smoke-376543.jpg'
import { motion } from "framer-motion";
import { TextField, Box, Typography, Button, List, ListItem, Card, CardContent, CardMedia, Grid, CircularProgress, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

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
    setLoading(true);
    try {
      const response = await axios.get(`${host}/api/course/fetchallcourses/${category}`);
      if (response.data && response.data.length > 0) {
        setCourses(response.data);
        console.log(response.data);

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
    setLoading(false);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredCourses.length) {
        setCourses(filteredCourses);
      } else {
        toast.error(`No courses found matching "${searchQuery}"`);
      }
    }
  };


  const handleViewCourseDetails = async(course_id)=>{
    try{
      navigate(`/viewcoursedetails/${course_id}`)
    }catch(error){
      console.log(error);
    }
  }


  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${BGImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      >

        {/* Search Bar with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box sx={{ paddingTop: "160px", paddingBottom: '20px', paddingX: '180px', display: "flex", justifyContent: "center" }}>
            <TextField
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search courses..."
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: 2 }}
            />
            <IconButton onClick={handleSearchSubmit} sx={{ marginLeft: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
        </motion.div>

        <Box sx={{ display: "flex", marginTop: "16px" }}>
          {/* Categories Sidebar with animation */}
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
          >
            <Box
              className="scrollbar-custom"
              sx={{
                width: "250px",
                padding: 1,
                backgroundColor: "rgba(1, 1, 27, 0.9)",
                backdropFilter: "blur(10px)",
                maxHeight: "calc(100vh - 60px)",
                overflowY: "auto",
                borderColor: '#0202a1',
                "&::-webkit-scrollbar": {
                  width: "5px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(1, 1, 27, 0.9)",
                  borderRadius: "20px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "rgba(3, 3, 63, 0.9)",
                },
                "&::-webkit-scrollbar-track": {
                  background: "rgba(1, 1, 27, 0.9)",
                },
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(3, 3, 63, 0.9) rgba(51, 51, 82, 0.9)",
                marginTop: "16px",
              }}
            >
              <List>
                {categories.map((category) => (
                  <ListItem key={category}>
                    <Button
                      sx={{
                        background: "linear-gradient(135deg, #3005a4, #997af0)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #997af0, #3005a4)",
                          transform: "scale(1.06)",
                        },
                      }}
                      variant="contained"
                      fullWidth
                      onClick={() => handleClickedCourse(category)}
                    >
                      {category}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          </motion.div>

        {/* Courses Grid */}
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {courses.map((course) => (
                <Grid item xs={10} sm={6} md={3} key={course._id}>
                  <Card
                    sx={{
                      maxWidth: 300,
                      margin: "auto",
                      borderRadius: "12px",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:3001/image/${course.image}`}
                      alt={course.title}
                      sx={{
                        width: "50px",             // Set the width
                        height: "50px",            // Set the height
                        objectFit: "cover",        // Ensure the image covers the entire area without distortion
                        marginLeft: "10px",
                        marginTop: "10px",
                        borderRadius: "50%"       // This will make the image round
                      }}
                    />
                    <CardContent sx={{ padding: 1 }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                        {course.description}
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: 1, fontSize: "0.875rem" }}>
                        <strong>Category:</strong> {course.category}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                        <strong>Tutor:</strong> {course.tutor}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                        <strong>Duration:</strong> {course.duration} hours
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          marginTop: 2,
                          fontSize: "0.875rem",
                          background: "linear-gradient(135deg, #3005a4, #997af0)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #997af0, #3005a4)",
                          },
                        }}
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
    </>
  );

};

export default Courses;
