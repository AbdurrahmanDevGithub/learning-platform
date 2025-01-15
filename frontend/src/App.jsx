import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CourseUplodePage from "./pages/CourseUplodePage";
import FetcheCourses from "./pages/CoursesDisplay";
import CourseUpdate from "./pages/CourseUpdatePage";
import ProtectedRoute from "./components/ProtextedRoute";
import PublicRoute from "./components/PublicRoute";
import Courses from "./pages/Courses";
import MyCourses from "./pages/MyCourses";
import ViewCourseDetails from "./pages/ViewCourseDetails";
import ViewBooks from "./pages/ViewBooks";



const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Protected Routes */}
        <Route path="/" element=
        {<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/uplodecourse" element={<ProtectedRoute> <CourseUplodePage /> </ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute> <FetcheCourses /> </ProtectedRoute>} />
        <Route path="/updatecourse/:id" element={<ProtectedRoute> <CourseUpdate /> </ProtectedRoute>} />
        <Route path="/allcourses" element={<ProtectedRoute> <Courses /> </ProtectedRoute> } />
        <Route path="/mycourses" element={<ProtectedRoute> <MyCourses /> </ProtectedRoute>} />
        <Route path="/viewcoursedetails/:course_id" element={ <ProtectedRoute><ViewCourseDetails /></ProtectedRoute>} />
        <Route path="/ViewBooks" element={ <ViewBooks />} />
      </Routes>

    </AnimatePresence>
  );
};

export default App;
