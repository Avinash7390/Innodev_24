import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Events from './pages/Events'
import Header from "./components/Header";
import FooterComp from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreateEvent from "./pages/CreateEvent";
import UpdateEvent from "./pages/UpdateEvent";
const App = () => {
  return (
    <>
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/AllEvents" element={<Events />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/update/:eventId" element={<UpdateEvent />} />
          </Route>
         
        </Routes>
        <FooterComp />
      </BrowserRouter>
      </>
  )
}

export default App
