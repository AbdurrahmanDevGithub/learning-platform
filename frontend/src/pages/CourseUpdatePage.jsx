import { useState } from "react";
import { updateCourse } from "../utils/tutor";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const CourseUpdate = () => {

    const [loading, setLoading] = useState(false);

    const { id: courseId } = useParams();

    const [formData, setFormData] = useState({
        category: "",
        title: "",
        tutor: "",
        duration: "",
        description: "",
    });

    const toastOptions = {
        position: "top-right",
        autoClose: 8000,
        pauseOnHover: true,
        theme: "dark"
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();

        data.append("category", formData.category);
        data.append("title", formData.title);
        data.append("tutor", formData.tutor);
        data.append("duration", formData.duration);
        data.append("description", formData.description);

        try {
            const token = localStorage.getItem("auth-token"); // Adjust as per your token storage logic

            if (!token) {
                toast.error("You must be logged in to update a course!", toastOptions);
                return;
            }
            const response = await updateCourse(courseId, data, token);
            console.log("Course Updated Successfully!", response);
            toast.success("Course updated successfully!", toastOptions);
        } catch (error) {
            console.log("Error updating courses", error);
            toast.error("Error updating course. Please try again!", toastOptions);
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar />
            <Container>
                <div className="form-container">
                    <form className="upload-form" onSubmit={handleSubmit}>
                        {/* Input fields */}
                        <label className="form-label">
                            Category:
                            <select
                                className="form-select"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option className="options" value="">
                                    Select Category
                                </option>
                                <option className="options" value="Engineering">
                                    Engineering
                                </option>
                                <option className="options" value="Technology">
                                    Technology
                                </option>
                                <option className="options" value="Business">
                                    Business
                                </option>
                                <option className="options" value="Art and Design">
                                    Art and Design
                                </option>
                            </select>
                        </label>

                        <label className="form-label">
                            Title:
                            <input
                                className="form-input"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="form-label">
                            Tutor:
                            <input
                                className="form-input"
                                type="text"
                                name="tutor"
                                value={formData.tutor}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="form-label">
                            Duration:
                            <input
                                className="form-input"
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="form-label">
                            Description:
                            <input
                                className="form-input"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </label>

                        {/* <label className="form-label">
                  Select Image:
                  <input
                    className="form-file"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
    
                <label className="form-label">
                  Select Video:
                  <input
                    className="form-file"
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </label> */}
                        <button
                            className={`button ${loading ? "loading" : ""}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Course"}
                        </button>

                    </form>
                </div>
            </Container>
            <ToastContainer />
        </>
    );
}

const Container = styled.div``

export default CourseUpdate;