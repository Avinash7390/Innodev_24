import React from "react";
import ManageEventCompo from "../functionalcomponents/ManageEventCSS";
import { useNavigate, useParams } from "react-router-dom";
const ManageEvent = () => {
  const {eventId} = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleClick = () => {
    navigate(`/single-event-analytics/${eventId}`);
  };
  return (
    <ManageEventCompo>
      <div class="container">
        <div class="section section1">
          <h2>Event Name : Name</h2>
          <form class="checkin-form" onSubmit={handleSubmit}>
            <h2>Check-in Participant</h2>
            <label for="participantName">Registration Number Please!</label>
            <input
              type="text"
              id="participantName"
              name="participantName"
              placeholder="Enter Registration Number"
              required
            />
            <button type="submit">CheckIn</button>
          </form>
        </div>
        <div class="section section2">
          <h2>Event Description : Event Description (This is Dummy event)</h2>
          <button class="analytics-btn" onClick={handleClick}>
            Go to Analytics
          </button>
          <p>Explore the Event</p>
        </div>
      </div>
    </ManageEventCompo>
  );
};

export default ManageEvent;
