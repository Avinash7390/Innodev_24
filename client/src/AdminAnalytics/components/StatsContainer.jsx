import StatItem from "./StatItem";
import StatsContainerWrapper from "../functionalcomponents/StatsContainer";
import axios from "axios";
import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import { motion } from 'framer-motion';
const StatsContainer = ({ defaultStats, eventId }) => {
  const [loader, setLoader] = useState(true);
  const [eventData, setEventData] = useState(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `/api/analytics/event-data/${eventId}`
        );
        const allUsers = await axios.get(
          `/api/attendance/get-all-attendees/${eventId}`
        );
        if (allUsers?.data?.ok) {
          setLen(allUsers?.data?.users?.length);
        }
        if (response?.data?.ok) {
          setLoader(false);
          setEventData(response?.data);
        } else {
          setLoader(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  console.log(eventData);
  let totalAmount = 0;
  const totalParticipants = eventData?.eventData?.length;

  eventData?.eventData?.map((data) => {
    totalAmount += data.amount;
  });

  let averageTicketPrice = 0;
  if (totalParticipants >= 1) {
    averageTicketPrice = totalAmount / totalParticipants;
  }
  defaultStats[0].count = totalParticipants;
  defaultStats[1].count = len;
  defaultStats[2].count = totalAmount;

  defaultStats[3].count = averageTicketPrice;
  if (loader)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <motion.div
    initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}>
    <StatsContainerWrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </StatsContainerWrapper>
    </motion.div>
  );
};

export default StatsContainer;
