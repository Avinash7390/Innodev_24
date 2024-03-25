import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Events from "./pages/Events";
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
import EventPage from "./pages/EventPage";

import ManageEvent from "./AdminAnalytics/pages/ManageEvent";
import SingleEventAnalytics from "./AdminAnalytics/pages/SingleEventAlalytics";
import AllEventAnalytics from "./AdminAnalytics/pages/AllEventAlalytics";
import AttendeesList from "./AdminAnalytics/components/AttendeesList";
import PaymentFailed from "./components/PaymentFailed";
import PaymentSuccess from "./components/PaymentSuccess";
import Search from "./pages/Search";

import Team from "./pages/Team";
import ScrollToTop from "./components/ScrollToTop";

import CalendarView from "./pages/CalendarView";


  
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<Search />} />

          <Route path="/AllEvents" element={<Events />} />
          <Route path="/CalendarView" element={<CalendarView />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivateRoute />}>
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/update/:eventId" element={<UpdateEvent />} />
            <Route path="/manage-event/:eventId" element={<ManageEvent />} />
            <Route
              path="/single-event-analytics/:eventId"
              element={<SingleEventAnalytics />}
            />
            <Route
              path="/all-event-analytics"
              element={<AllEventAnalytics />}
            />
            <Route
              path="/event-attendees/:eventId"
              element={<AttendeesList />}
            />
          </Route>

          <Route path="/event/:eventSlug" element={<EventPage />} />

          <Route
            path="/payment-success/:eventId/:userId/:amount"
            element={<PaymentSuccess />}
          />
          <Route
            path="/payment-failed/:eventId/:userId"
            element={<PaymentFailed />}
          />
          <Route path="/team" element={<Team />} />
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </>
  );
};

export default App;
