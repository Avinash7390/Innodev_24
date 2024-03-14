import React from "react";
import SingleEventDescWrapper from "../functionalcomponents/SingleEventDescription";
import SingleEventDescChildWrapper from "../functionalcomponents/SingleEventDescChild";
import { NavLink } from "react-router-dom";

const SingleEventDesc = ({ data }) => {
  return (
    <>
      <SingleEventDescWrapper>
        <SingleEventDescChildWrapper color="#184f80" bcg="#b3d5f2">
          <h2 className="title">Title : {data?.title}</h2>
          <span className="date">Date : {data?.Date}</span>
          <span className="time">Time : {data?.Time}</span>
          <h3 className="venue">Venue: {data?.Venue}</h3>
          <h5 className="Desc">Description: {data?.desc}</h5>

          <NavLink to={"/event-attendees"} className={"attendees"}>
            <span>View Attendees List</span>
          </NavLink>
        </SingleEventDescChildWrapper>
      </SingleEventDescWrapper>
    </>
  );
};

export default SingleEventDesc;
