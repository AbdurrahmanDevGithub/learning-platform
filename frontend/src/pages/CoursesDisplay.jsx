import { useEffect, useState } from "react";
import { getCourses } from "../utils/tutor";

const FetcheCourses = () => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    const fetchCourse = async () => {
      try{
        const data = await getCourses(token);
        console.log("Fetch Courses: ",data);
        setCourses(data);
      }
      catch(error){
        setError("Filed to upload course, plz try again");
      }
      finally{
        setLoading(false);
      }
    };

    fetchCourse();

  },[token])

  if(loading){
    return <p>Loading Courses.......</p>
  }

  if(error){
    return <p>Error: {error}</p>
  }

  return (
    <div>
        <h2>Available Courses</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {Array.isArray(courses.data) && courses.data.length > 0 ? (
                courses.data.map((course, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "300px",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={course.image.path} // Adjust path based on your image URL
                            alt={course.title}
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                            }}
                        />
                        <h3>{course.title}</h3>
                        <p><strong>Category:</strong> {course.category}</p>
                        <p><strong>Tutor:</strong> {course.tutor}</p>
                        <p><strong>Duration:</strong> {course.duration} hours</p>
                        <p><strong>Description:</strong> {course.description}</p>
                        <video
                            controls
                            style={{
                                width: "100%",
                                height: "auto",
                                marginTop: "10px",
                            }}
                        >
                            <source src={course.video.path} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))
            ) : (
                <p>No courses available or loading...</p>
            )}
        </div>
    </div>
);


}

export default FetcheCourses;