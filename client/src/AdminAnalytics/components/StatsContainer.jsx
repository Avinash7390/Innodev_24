import StatItem from "./StatItem";
import StatsContainerWrapper from "../functionalcomponents/StatsContainer";
import axios from "axios";
import { useState, useEffect } from "react";

const StatsContainer = ({ defaultStats, eventId }) => {
  const [loader, setLoader] = useState(true);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {

    const getUserData = async () => {
      try{
        setLoader(true);
        const response = await axios.get(`/api/analytics/event-data/${eventId}`)
        if(response?.data?.ok){
          setLoader(false);
          setEventData(response?.data);
        }else{
          setLoader(true);
        }
      }catch(err){

        console.log(err);
      }
    }
    getUserData();
  }, [])

  console.log(eventData);
  let totalAmount = 0;
  const totalParticipants = eventData?.eventData?.length;

  eventData?.eventData?.map((data) => {
    totalAmount += data.amount;
  })

  let averageTicketPrice = 0;
  if(totalParticipants >= 1){
    averageTicketPrice = totalAmount/ totalParticipants;
  }
  defaultStats[0].count = totalParticipants;
  defaultStats[1].count = totalParticipants;
  defaultStats[2].count = totalAmount;

  defaultStats[3].count = averageTicketPrice;


  return (
    <StatsContainerWrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </StatsContainerWrapper>
  );
};

export default StatsContainer;
