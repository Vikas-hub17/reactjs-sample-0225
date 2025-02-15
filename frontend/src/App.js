import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskBoard from './components/TaskBoard';
import GlobalStyle from './globalStyles';
import WalletInfo from "./components/WalletInfo";
import LoginSignup from "./components/LoginSignup";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/taskboard" element={<TaskBoard />} />
            <Route path="/wallet-info" element={<WalletInfo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
