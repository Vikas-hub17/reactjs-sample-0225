import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Change to your backend URL if deployed

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Auto-redirect if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/taskboard");
    }
  }, [navigate]);

  // Handle Login/Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    try {
      if (isLogin) {
        // Login Request
        const { data } = await axios.post(`${API_BASE_URL}/login`, { email, password });
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/taskboard"); // Redirect to TaskBoard
      } else {
        // Signup Request
        await axios.post(`${API_BASE_URL}/signup`, { email, password });
        alert("Signup successful! Please login.");
        setIsLogin(true); // Switch to login form
      }
    } catch (error) {
      alert(error.response?.data?.message || "Server error");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>{isLogin ? "Login" : "Sign Up"}</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <SubmitButton type="submit">{isLogin ? "Login" : "Sign Up"}</SubmitButton>
        </Form>
        <ToggleText onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </ToggleText>
      </FormWrapper>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #1e448f, #4a69bd);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #1e448f;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background: #1e448f;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #4a69bd;
  }
`;

const ToggleText = styled.p`
  margin-top: 10px;
  color: #1e448f;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default LoginSignup;
