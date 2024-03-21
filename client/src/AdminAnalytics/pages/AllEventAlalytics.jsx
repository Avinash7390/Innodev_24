import React from "react";
import StatsContainer from "../components/StatsContainer";
import ChartContainerForAllEvents from "../components/ChartContainerForAllEvents";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { FaCalendarCheck, FaMoneyCheckAlt } from "react-icons/fa";
import { motion } from 'framer-motion';
const AllEventAlalytics = () => {
  const data = [
    { count: 2, date: "12-03-2021" },
    { count: 3, date: "13-03-2021" },
    { count: 3, date: "13-04-2021" },
    { count: 3, date: "9-05-2021" },
  ];
  const defaultStats = [
    {
      title: "Active Events",
      count: 26 || 0,
      icon: <MdOutlineNotificationsActive />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Registered Students",
      count: 50 || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Total Revenue",
      count: 4000 || 0,
      icon: <FaMoneyCheckAlt />,
      color: "#0fa343",
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
      <motion.div
        style={{
          marginRight: "50px",
          marginTop: "50px",
          marginLeft: "50px",
          marginBottom: "50px",
          borderRadius: "10px",
        }}
        initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
      >
        <h2 style={{ color: "#636263", marginLeft: "10px" }}>
          All Events Stats
        </h2>
        <StatsContainer defaultStats={defaultStats} />
        <ChartContainerForAllEvents data={data} />
      </motion.div>
    </>
  );
};

export default AllEventAlalytics;
