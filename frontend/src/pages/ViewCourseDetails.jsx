import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import BGImage from "../assets/smoke-376543.jpg";
import LikeIcon from "../assets/like.png";
import DislikeIcon from "../assets/dislike.png";
import ShareIcon from "../assets/send.png";
import Footer from "../components/Footer";

const ViewCourseDetails = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const navigate = useNavigate();

  const handleViewCourseDetails = (course_id) => {
    navigate(`/viewcoursedetails/${course_id}`);
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You need to sign in first");
          return;
        }

        const response = await axios.get(
          `http://localhost:3001/api/course/viewcoursedetails/${course_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data) {
          setCourse(response.data);
          const recommendationResponse = await axios.get(
            `http://localhost:3001/api/course/coursebyrecommendation/${response.data.category}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setRecommendedCourses(recommendationResponse.data);
        } else {
          toast.error("Course details not found");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching course details");
      }
    };

    fetchCourseDetails();
  }, [course_id]);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    console.log("You liked this course!");
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
    console.log("You disliked this course.");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log("Course link copied to clipboard!");
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      console.log("Comment cannot be empty.");
      return;
    }
    setComments([...comments, newComment]);
    setNewComment("");
    toast.success("Comment added!");
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${BGImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          color: "white",
          gap: "50px"
        }}
      >
        <div
          style={{
            padding: "160px",
            maxWidth: "1600px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr",
            gap: "80px",
          }}
        >
          {course ? (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(10px)",
                color: "white",
              }}
            >
              
              <div style={{ textAlign: "center" }}>
                <video
                  src={`http://localhost:3001/video/${course.video}`}
                  controls
                  type="video/mp4"
                  style={{
                    width: "100%",
                    maxWidth: "850px",
                    aspectRatio: "16/9",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    background: "rgba(255, 255, 255, 0.3)",
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              
              <h2 style={{ fontSize: "28px", fontWeight: "bold", marginTop: "10px" }}>{course.title}</h2>
              <p style={{ fontSize: "18px", fontWeight: "500", marginTop: "10px" }}>
                <strong>Category:</strong> {course.category}
              </p>

              
              <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop: "10px" }}>
                <button onClick={handleLike} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize: "18px"
                }}>
                  <img src={LikeIcon} alt="Like" width="30" height="30" /> {likeCount}
                </button>
                <button onClick={handleDislike} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize: "18px"
                }}>
                  <img src={DislikeIcon} alt="Dislike" width="30" height="30" /> {dislikeCount}
                </button>
                <button onClick={handleShare} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize: "18px"
                }}>
                  <img src={ShareIcon} alt="Share" width="30" height="30" />
                </button>
              </div>

              
              <div>
                <h3 style={{ padding: "0.1rem", marginTop: "10px" }}>Comments</h3>
                <ul style={{ listStyle: "none", padding: "0.2rem" }}>
                  {comments.map((comment, index) => (
                    <li key={index} style={{ padding: "7px 0" }}>
                      {comment}
                    </li>
                  ))}
                </ul>
                <TextField
                  fullWidth
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment"
                  variant="outlined"
                  style={{ marginTop: "10px", background: "white", borderRadius: "8px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddComment}
                  sx={{
                    marginTop: "10px",
                    background: "linear-gradient(135deg, white, #a69090)",
                    color: "black",
                    fontWeight: "bold",
                    "&:hover": {
                      background: "linear-gradient(135deg, navy, #0505f1)",
                      color: "white"
                    },
                  }}
                >
                  Add Comment
                </Button>
              </div>
            </div>
          ) : (
            <p>Loading course details...</p>
          )}

          
          <div>
            <h3 style={{ padding: "20px", fontWeight: "bold" }}>Recommended Courses</h3>
            {recommendedCourses.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {recommendedCourses.map((recommendedCourse) => (
                  <div
                    key={recommendedCourse._id}
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      padding: "16px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      color: "white",
                    }}
                  >
                    <h4>{recommendedCourse.title}</h4>
                    <p>
                      <strong>Category:</strong> {recommendedCourse.category}
                    </p>
                    <Button
                      variant="contained"
                      onClick={() => handleViewCourseDetails(recommendedCourse._id)}
                      sx={{
                        background: "linear-gradient(135deg, white, #a69090)",
                        color: "navy",
                        "&:hover": { background: "linear-gradient(135deg, navy, #0505f1)", color: "white" },
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recommended courses available.</p>
            )}
          </div>
        </div>
        <Footer />
      </div >
    </>
  );
};

export default ViewCourseDetails;
