import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaStar } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import BGImage from '../assets/smoke-376543.jpg';
import Footer from '../components/Footer';

const ViewCourseDetails = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("You need to sign in first");
          return;
        }

        const response = await axios.get(`http://localhost:3001/api/course/viewcoursedetails/${course_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setCourse(response.data);
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
    toast.success("You liked this course!");
  };

  const handleDislike = () => {
    toast.warn("You disliked this course.");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Course link copied to clipboard!");
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      toast.error("Comment cannot be empty.");
      return;
    }
    setComments([...comments, newComment]);
    setNewComment('');
    toast.success("Comment added!");
  };

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
        <div
          style={{
            padding: "160px",
            maxWidth: "1400px",
            margin: "0 auto",
            backgroundColor: "transparent",
            color: "white",
            display: "flex"
          }}
        >
          {course ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Video Section */}
              <div style={{ margin: "0 auto", maxWidth: "100%", textAlign: "center" }}>
                <video
                  src={`http://localhost:3001/video/${course.video}`}
                  controls
                  type="video/mp4"
                  style={{
                    width: "800px",
                    maxWidth: "1280px",
                    aspectRatio: "16/9",
                    margin: "0 auto",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    display: "block",
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Course Details */}
              <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                </div>
              </div>

              {/* Actions Section */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between", 
                  maxWidth: "2280px",
                  margin: "15px auto",
                  alignItems: "center", 
                }}
              >
                {/* Image Section */}
                <img
                  src={`http://localhost:3001/image/${course.image}`}
                  alt={course.title}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    marginRight: "20px", 
                    borderRadius: "50%",
                  }}
                />

                {/* Title Section */}
                <h2
                  style={{
                    fontSize: "1.7rem",
                    margin: "0 25px",
                    color: "white",
                    flexGrow: 1,
                  }}
                >
                  {course.title}
                </h2>

                <p
                  style={{
                    margin: "0 25px",
                    color: "white",
                  }}
                >
                  <strong>Category:</strong> {course.category}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "25px",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={handleLike}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "#4caf50",
                      gap: "10px",
                    }}
                  >
                    <FaThumbsUp size={24} /> Like
                  </button>
                  <button
                    onClick={handleDislike}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "#f44336",
                      gap: "5px",
                    }}
                  >
                    <FaThumbsDown size={24} /> Dislike
                  </button>
                  <button
                    onClick={handleShare}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "#2196f3",
                      gap: "5px",
                    }}
                  >
                    <FaShareAlt size={24} /> Share
                  </button>
                </div>
              </div>

              {/* Rating Section */}
              <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <p>
                  <strong>Rate this Course:</strong>
                </p>
                <div style={{ display: "flex", gap: "7px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} size={25} color="#ff9800" />
                  ))}
                </div>
              </div>

              {/* Comment Section */}
              <div
                style={{
                  maxWidth: "1280px",
                  margin: "0 auto",
                  background: "transparent",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <p style={{ marginBottom: "10px", fontSize: "1.2rem", fontWeight: "bold" }}>
                  Comments:
                </p>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {comments.map((comment, index) => (
                    <li
                      key={index}
                      style={{
                        background: "transparent",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "4px",
                      }}
                    >
                      {comment}
                    </li>
                  ))}
                </ul>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={handleAddComment}
                  style={{
                    background: "#2196f3",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Add Comment
                </button>
              </div>
            </div>
          ) : (
            <p>Loading course details...</p>
          )}
        </div>


      </div>

      <Footer />
    </>
  );
};

export default ViewCourseDetails;
