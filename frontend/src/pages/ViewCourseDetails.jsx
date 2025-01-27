import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaThumbsUp, FaThumbsDown, FaShareAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import BGImage from '../assets/smoke-376543.jpg';
import Footer from '../components/Footer';

const ViewCourseDetails = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  const handleViewCourseDetails = async (course_id) => {
    try {
      navigate(`/viewcoursedetails/${course_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('You need to sign in first');
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
          toast.error('Course details not found');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching course details');
      }
    };

    fetchCourseDetails();
  }, [course_id]);

  const handleLike = () => {
    toast.success('You liked this course!');
  };

  const handleDislike = () => {
    toast.warn('You disliked this course.');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Course link copied to clipboard!');
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') {
      toast.error('Comment cannot be empty.');
      return;
    }
    setComments([...comments, newComment]);
    setNewComment('');
    toast.success('Comment added!');
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
          color: 'white',
        }}
      >
        <div
          style={{
            padding: '180px',
            maxWidth: '1700px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '4fr 1fr',
            gap: '220px',
          }}
        >
          {/* Main Course Details */}
          {course ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px',  }}>
              {/* Video Section */}
              <div style={{ margin: '0 auto', maxWidth: '100%', textAlign: 'center' }}>
                <video
                  src={`http://localhost:3001/video/${course.video}`}
                  controls
                  type="video/mp4"
                  style={{
                    width: '800px',
                    maxWidth: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Course Details */}
              <h2>{course.title}</h2>
              <p><strong>Category:</strong> {course.category}</p>
              <div
                style={{
                  display: 'flex',
                  gap: '25px',
                  alignItems: 'center',
                }}
              >
                <button onClick={handleLike} style={{ color: '#4caf50' }}>
                  <FaThumbsUp size={24} /> Like
                </button>
                <button onClick={handleDislike} style={{ color: '#f44336' }}>
                  <FaThumbsDown size={24} /> Dislike
                </button>
                <button onClick={handleShare} style={{ color: '#2196f3' }}>
                  <FaShareAlt size={24} /> Share
                </button>
              </div>

              {/* Comments Section */}
              <div>
                <h3>Comments</h3>
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your comment"
                />
                <button onClick={handleAddComment}>Add Comment</button>
              </div>
            </div>
          ) : (
            <p>Loading course details...</p>
          )}

          {/* Recommended Courses */}
          <div>
            <h3>Recommended Courses</h3>
            <h4>-----------------------------------</h4>
            {recommendedCourses.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '30px',
                }}
              >
                {recommendedCourses.map((recommendedCourse) => (
                  <div
                    key={recommendedCourse._id}
                    style={{
                      background: ' rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      padding: '16px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      color: 'white',
                    }}
                  >
                    {/* <img
                      src={`http://localhost:3001/image/${recommendedCourse.image}`}
                      alt={recommendedCourse.title}
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    /> */}
                    <h4 style={{ margin: '10px 0' }}>{recommendedCourse.title}</h4>
                    <p><strong>Category:</strong> {recommendedCourse.category}</p>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <Button
                          variant="contained"
                          onClick={() => handleViewCourseDetails(recommendedCourse._id)}

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
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recommended courses available.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ViewCourseDetails;
