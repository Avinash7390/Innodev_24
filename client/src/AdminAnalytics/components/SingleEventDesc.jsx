import React, { useEffect, useState } from "react";
import SingleEventDescWrapper from "../functionalcomponents/SingleEventDescription";
import SingleEventDescChildWrapper from "../functionalcomponents/SingleEventDescChild";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Spinner } from "flowbite-react";

const SingleEventDesc = ({eventId }) => {
  const [loader, setLoader] = useState(true);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {

    const getUserData = async () => {
      try{
        setLoader(true);
        const response = await axios.get(`/api/analytics/event-data/${eventId}`)
        if(response?.data?.ok){
          setLoader(false);
          setEventData(response?.data?.singleEvent[0]);
        }else{
          setLoader(true);
        }
      }catch(err){

        console.log(err);
      }
    }
    getUserData();
  }, [])

  // console.log(eventData);
  if (loader)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl' />
    </div>
  );


  return (
    <>
      <SingleEventDescWrapper>
        <SingleEventDescChildWrapper color="#184f80" bcg="#b3d5f2">
          <h2 className="title">Title : {eventData && eventData.title}</h2>
          <span className="date">Date : {eventData && eventData.date}</span>
          <span className="time">Time : {eventData && eventData.time}</span>
          <h3 className="venue">Venue: {eventData && eventData.location}</h3>
          <h5 className="Desc">Description: {eventData && eventData.content}</h5>

          <NavLink to={`/event-attendees/${eventId}`} className={"attendees"}>
            <span>View Attendees List</span>
          </NavLink>
        </SingleEventDescChildWrapper>
      </SingleEventDescWrapper>
    </>
  );
};

export default SingleEventDesc;
