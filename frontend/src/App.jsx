import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CourseUplodePage from "./pages/CourseUplodePage";  // Typo fixed: "Uplode" should be "Upload"
import CourseDisplayPage from "./pages/CoursesDisplay";


const App = () => {
  const location = useLocation(); 

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uploadcourse" element={<CourseUplodePage />} />  
        <Route path="/courses" element={<CourseDisplayPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
