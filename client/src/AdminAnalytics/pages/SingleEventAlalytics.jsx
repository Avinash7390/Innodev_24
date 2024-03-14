import React from "react";
import StatsContainer from "../components/StatsContainer";
import ChartsContainerForSingleEvent from "../components/ChartContainerForSingleEvent";
import SingleEventDesc from "../components/SingleEventDesc";
import { IoTicketOutline } from "react-icons/io5";
import { FaMoneyCheckAlt, FaUserCheck } from "react-icons/fa";
import { GiPlayerNext } from "react-icons/gi";

const SingleEventAlalytics = () => {
  const data = [
    { CheckedIn: 2, time: "7:45", Remaining: 40 },
    { CheckedIn: 10, time: "8:30", Remaining: 32 },
    { CheckedIn: 6, time: "8:00", Remaining: 36 },
    { CheckedIn: 30, time: "10:10", Remaining: 12 },
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
      count: 100 || 0,
      icon: <GiPlayerNext />,
      color: "#2a99a3",
      bcg: "#c5ecf0",
    },
    {
      title: "Checked-In",
      count: 50 || 0,
      icon: <FaUserCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Total Revenue",
      count: 4000 || 0,
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
  return (
    <>
      <div
        style={{
          marginRight: "50px",
          marginTop: "20px",
          marginLeft: "50px",
          marginBottom: "50px",
          borderRadius: "10px",
        }}
      >
        <h2
          style={{
            color: "#636263",
            marginLeft: "10px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Event Name Stats
        </h2>
        <StatsContainer defaultStats={defaultStats} />
        <SingleEventDesc data={eventDesc} />
        <ChartsContainerForSingleEvent data={data} />
      </div>
    </>
  );
};

export default SingleEventAlalytics;
