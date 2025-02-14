import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskBoard from './components/TaskBoard';
import Profile from './components/Profile';
import EthereumStatus from './components/EthereumStatus';
import GlobalStyle from './globalStyles';
import styled from 'styled-components';

const Header = styled.h1`
  text-align: center;
  padding: 20px;
  background-color: #0079bf;
  color: white;
  margin-bottom: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <div className="App">
          <Header>Task Board Application</Header>
          <Routes>
            <Route path="/" element={<TaskBoard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ethereum" element={<EthereumStatus />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
