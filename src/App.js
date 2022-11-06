import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Wrapper from './page/Wrapper/Wrapper';
import Home from './page/home/Home';
import About from './page/login/About';
import Posts from './page/login/Posts';
import NotFound from './page/login/404';
import FileProcessing from './page/login/FileProcessing';
import Login from './page/login/Login'; 
import Protected from './page/components/Protected'
import Register from './page/login/Register';
import HeaderNav from './page/components/HeaderNav';


function App() {
  // Get token from local storage
  const tokenLocalStorage = localStorage.getItem("token");
  // So we will pas token from local storage to this state
  // This is global state
  // For futher, we will use redux for global state (state management)
  const [token, setToken] = useState(tokenLocalStorage);
  return (
    <BrowserRouter>
      <HeaderNav setToken={setToken} token={token} />
      <Routes>
      <Route path='/' element={<Wrapper/>}>
        <Route index element={<Home/>}/>
      </Route>
      <Route path="/about" element={<About />} />
          <Route
            path="/posts"
            element={
              <Protected token={token} setToken={setToken}>
                <Posts />
              </Protected>
            }
          />
          <Route path="/file-processing" element={<FileProcessing />} />

          <Route
            path="/login"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route
            path="/register"
            element={<Register token={token} setToken={setToken} />}
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
