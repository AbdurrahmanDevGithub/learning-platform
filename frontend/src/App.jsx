import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CourseUplodePage from "./pages/CourseUplodePage";
// import CourseDisplayPage from "./pages/CoursesDisplay";
import Navbar from "./components/Navbar";
import ManageCourses from "./pages/ManageCourses";
import FetcheCourses from "./pages/CoursesDisplay";
import CourseUpdate from "./pages/CourseUpdatePage";

const App = () => {
  const location = useLocation(); 

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="uplodecourse" element={<CourseUplodePage/>}/>
        <Route path="/courses" element={<FetcheCourses/>}/>
        <Route path="/nav" element={<Navbar/>}/>
        <Route path="manage" element={<ManageCourses/>}/>
        <Route path="/updatecourse" element={<CourseUpdate />} />

      </Routes>
    </AnimatePresence>
  );
};

export default App;
