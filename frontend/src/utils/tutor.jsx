import axios from 'axios';

const API_URL = "http://localhost:3001/api/tutor";

/**
 * Upload a course with authentication
 * @param {Object} formData - Form data for the course (must include multipart fields)
 * @param {string} token - JWT token for authentication
 * @returns {Object} Response data from the server
 * @throws Will throw an error if the upload fails
 */
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

/**
 * Get the list of courses
 * @param {string} token - JWT token for authentication
 * @returns {Object} Response data from the server containing courses
 * @throws Will throw an error if fetching fails
 */

export const getCourses = async (token) => {
    try{
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${API_URL}/fetchcourses`, config);
        return response.data;

    }
    catch(error){
        console.log("Failed to fetch courses: ",error.response?.data || error.message);
        throw new Error("Error fetching courses");
    }
}

