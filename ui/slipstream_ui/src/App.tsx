import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<Login />} /> {/* rota fallback */}
      </Routes>
    </Router>
  );
}


export default App