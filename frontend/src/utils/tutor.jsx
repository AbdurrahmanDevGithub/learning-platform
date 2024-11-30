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

        const response = await axios.get(`${API_URL}/fetchcourses`, config);
        return response.data;

    }
    catch (error) {
        console.log("Failed to fetch courses: ", error.response?.data || error.message);
        throw new Error("Error fetching courses");
    }
}


export const updateCourse = async (id, formData, token) =>{
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.put(`${API_URL}/updatecourse/${id}`, formData, config);
        console.log("COurse Uploade successfully: ", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Course update error", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Erroe updating course")
    }
}


export const deleteCourse = async (id, token)=>{
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };

        const response = await axios.delete(`${API_URL}/deletecourse/${id}`, config);
        console.log("COurse deleted successfully", response.data)
        return response.data;
    }
    catch (error) {
        console.error(
            "Course deletion error:",
            error.response?.data || error.message
        );
        throw new Error(
            error.response?.data?.message || "Error deleting course"
        );
    }
}