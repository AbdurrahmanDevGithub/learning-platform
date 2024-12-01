import axios from 'axios';

const API_URL = "http://localhost:3001/api/tutor";

export const uploadCourse = async (formData, token) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`, // Ensure token is passed correctly
            },
        };

        const response = await axios.post(`${API_URL}/uploadcourse`, formData, config);
        console.log("Course uploaded successfully:", response.data);

        return response.data;

    } catch (error) {
        console.error(
            "Course uploading error:",
            error.response?.data || error.message
        );
        throw new Error(
            error.response?.data?.message || "Error uploading course"
        );
    }
};


export const getCourses = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${API_URL}/fetchallcourses`, config);
        return response.data;

    }
    catch (error) {
        console.log("Failed to fetch courses: ", error.response?.data || error.message);
        throw new Error("Error fetching courses");
    }
}

export const updateCourse = async (id, formData, token) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.put(`${API_URL}/updatecourse/${id}`, formData, config);
        console.log("Course uploaded successfully: ", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // API returned an error response
            console.error("Course update error:", error.response.data);
            throw new Error(error.response.data.message || "Error updating course");
        } else if (error.request) {
            // No response was received from the server
            console.error("No response received:", error.request);
            throw new Error("No response from the server");
        } else {
            // Something went wrong in setting up the request
            console.error("Error setting up the request:", error.message);
            throw new Error("Error in request setup");
        }
    }
};



export const deleteCourse = async (id, token) => {
    try {
      console.log("Deleting course with ID:", id); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.delete(`${API_URL}/deletecourse/${id}`, config);
      console.log("Course deleted successfully", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Course deletion error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Error deleting course"
      );
    }
  };
  