import "./App.css";
import React, { useEffect } from "react";
import Home from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Authentication/Auth/Auth";
import SignInPage from "./components/Authentication/SignIn/SignIn";
import Register from "./components/SignUp/SignUp";
import ManageTasks from "./components/ManageTasks/ManageTasks";
import Calendar from "./components/Calendar/Calendar";
import Habits from "./components/Habits/Habits";
import Profile from "./components/Profile/Profile";
import DemoVideo from "./components/DemoVideo/DemoVideo";
import Contact from "./components/Contacts";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<SignInPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            path="/donna/managetasks"
            element={
              <Auth>
                <ManageTasks />
              </Auth>
            }
          />
          <Route
            path="/donna/calendar"
            element={
              <Auth>
                <Calendar />
              </Auth>
            }
          />
          <Route
            path="/donna/habits"
            element={
              <Auth>
                <Habits />
              </Auth>
            }
          />
          <Route
            path="/donna/profile"
            element={
              <Auth>
                <Profile />
              </Auth>
            }
          />
          <Route
            path="/donna/demo"
            element={
              
                <DemoVideo />
            
            }
          />
      <Route
            path="/donna/contacts"
            element={
              
                <Contact />
            
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
