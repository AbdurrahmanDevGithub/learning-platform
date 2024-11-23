import axios from 'axios'

const API_URL = "http://localhost:3001/api/tutor";

export const uplodeCourse = async(formData, token) => {
    try{
        const config = {
            headers: {
                "Content-Type" : "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post(`${API_URL}/uploadcourse`, formData, config);
        console.log(response.data);
        return response.data;

    }catch(error){
        console.log("Course uploading error", error);
        throw error.response?.data || "Error uploading course";
    }
}
