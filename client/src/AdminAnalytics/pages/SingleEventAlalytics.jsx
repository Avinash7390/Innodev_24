import React, { useEffect, useState } from "react";
import StatsContainer from "../components/StatsContainer";
import ChartsContainerForSingleEvent from "../components/ChartContainerForSingleEvent";
import SingleEventDesc from "../components/SingleEventDesc";
import { IoTicketOutline } from "react-icons/io5";
import { FaMoneyCheckAlt, FaUserCheck } from "react-icons/fa";
import { GiPlayerNext } from "react-icons/gi";
import { Spinner, Button } from "flowbite-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion';
const SingleEventAlalytics = () => {
  const { eventId } = useParams();
  const [loader, setLoader] = useState(true);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `/api/analytics/event-data/${eventId}`
        );
        if (response?.data?.ok) {
          setLoader(false);
          setEventData(response?.data?.singleEvent[0]);
        } else {
          setLoader(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  const data = [
    { CheckedIn: 1, time: "7:45", Remaining: 5 },
    { CheckedIn: 2, time: "8:30", Remaining: 4 },
    { CheckedIn: 3, time: "8:00", Remaining: 3 },
  ];
  const eventDesc = {
    title: "Cricket Mania",
    Date: "12-03-2024",
    Time: "2:30PM",
    Venue: "Atheletics Ground",
    desc: "It's cricket match organized by SAC MNNIT",
    ticketPrice: [20, 30, 200, 300],
  };
  const defaultStats = [
    {
      title: "Total Participants",
      count: 6 || 0,
      icon: <GiPlayerNext />,
      color: "#2a99a3",
      bcg: "#c5ecf0",
    },
    {
      title: "Checked-In",
      count: 2 || 0,
      icon: <FaUserCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Total Revenue",
      count: 1200 || 0,
      icon: <FaMoneyCheckAlt />,
      color: "#1f875f",
      bcg: "#cce6d5",
    },
    {
      title: "Average Ticket Price",
      count: 200 || 0,
      icon: <IoTicketOutline />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  if (loader) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }
  return (
    <>
      <motion.div 
        style={{
          marginRight: "50px",
          marginTop: "20px",
          marginLeft: "50px",
          marginBottom: "50px",
          borderRadius: "10px",
        }}
        initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
      >
        <h2
          style={{
            color: "#098d99;",
            marginLeft: "10px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Event : {eventData && eventData.title}
        </h2>
        <StatsContainer defaultStats={defaultStats} eventId={eventId} />
        <SingleEventDesc eventId={eventId} />
        <ChartsContainerForSingleEvent data={data} />
      </motion.div>
    </>
  );
};

export default SingleEventAlalytics;
