import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskBoard from './components/TaskBoard';
import GlobalStyle from './globalStyles';
import LoginSignup from "./components/LoginSignup";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
      <Routes>
        {/* ✅ Default page is LoginSignup */}
        <Route path="/" element={<LoginSignup />} />

        {/* ✅ TaskBoard is protected, requires login */}
        <Route path="/taskboard" element={<ProtectedRoute><TaskBoard /></ProtectedRoute>} />
 
      </Routes>
    </Router>
    </>
  );
}

// ✅ Protect the TaskBoard Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default App;
