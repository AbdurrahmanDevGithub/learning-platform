import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CourseUplodePage from "./pages/CourseUplodePage";
import CourseDisplayPage from "./pages/CoursesDisplay";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation(); 

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
        <Route path="uplodecourse" element={<CourseUplodePage/>}/>
        <Route path="/courses" element={<CourseDisplayPage/>}/>
        <Route path="/nav" element={<Navbar/>}/>
=======
        <Route path="/uplodecourse" element={<CourseUplodePage/>}/>
>>>>>>> 464dafe0198b7e13c749a26375d32f88560db502
      </Routes>
    </AnimatePresence>
  );
};

export default App;
