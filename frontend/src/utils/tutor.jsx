import axios from 'axios'

const API_URL = "http://localhost:3001/api/tutor";

export const uploadCourse = async (formData, token) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`, // Ensure this is correct
            },
        };

        const response = await axios.post(`${API_URL}/uploadcourse`, formData, config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Course uploading error:", error.response?.data || error.message);
        throw error.response?.data || "Error uploading course";
    }
};

