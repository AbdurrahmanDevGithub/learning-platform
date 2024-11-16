import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"

const App = () => {
  return (
    <BrowserRouter future= {{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
