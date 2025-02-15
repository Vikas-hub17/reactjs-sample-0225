import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const API_BASE_URL = "https://reactjs-sample-0225.onrender.com/api"; // Replace with your backend URL

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");


  // ✅ Handle Input Change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!userData.email || !userData.password) {
      setError("Please enter both email and password!");
      return;
    }
  
    try {
      if (isLogin) {
        // ✅ Login API Call
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        localStorage.setItem("token", data.token);
        navigate("/taskboard");
      } else {
        // ✅ Signup API Call (Make sure your backend has this route)
        await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        alert("Signup successful! Please log in.");
        setIsLogin(true); // Switch to login mode after signup
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed!");
    }
  };
  
  return (
    <Wrapper>
      <FormContainer>
        <Logo>🚀 Task Manager</Logo>
        <Title>{isLogin ? "Welcome Back" : "Create an Account"}</Title>
        <Subtitle>{isLogin ? "Login to continue" : "Signup to get started"}</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleChange} required />
          <Input type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />

          <SubmitButton type="submit">{isLogin ? "Login" : "Signup"}</SubmitButton>
        </Form>

        <SwitchText>
          {isLogin ? "Don't have an account?" : "Already have an account?"}  
          <SwitchLink onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </SwitchLink>
        </SwitchText>
      </FormContainer>
    </Wrapper>
  );
};

export default LoginSignup;

// ✅ Styled Components
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
`;

const FormContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
  animation: fadeIn 0.5s ease-in-out;
`;

const Logo = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #1e3c72;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #1e3c72;
    outline: none;
    box-shadow: 0 0 5px rgba(30, 60, 114, 0.3);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #1e3c72;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 10px;

  &:hover {
    background: #163b7a;
  }
`;

const SwitchText = styled.p`
  font-size: 14px;
  margin-top: 15px;
`;

const SwitchLink = styled.span`
  color: #1e3c72;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;
