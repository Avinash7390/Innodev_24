import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Button } from "flowbite-react";
import { FaTicketAlt } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { useSelector,useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js/pure";
import axios from "axios";
import { setConfirmedTickets,setFinalPrice } from "../redux/ticket/ticketSlice";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { motion } from 'framer-motion';
const EventPage = () => {
  const { eventSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [event, setEvent] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
console.log(selectedTickets);


  const handleTicketSelect = (ticket) => {
    if (selectedTickets.includes(ticket)) {
      // Deselect the ticket
      setSelectedTickets(selectedTickets.filter(t => t !== ticket));
      setTotalPrice(totalPrice - ticket.price);
      
    } else {
      // Check if the user can select more tickets
      if (selectedTickets.length < event.tickets.length) {
        // Check if the total price won't exceed the sum of all ticket prices
        const sumOfTicketPrices = event.tickets.reduce((sum, ticket) => sum + ticket.price, 0);
        if (totalPrice + ticket.price <= sumOfTicketPrices) {
          // Select the ticket
          setSelectedTickets([...selectedTickets, ticket]);
          setTotalPrice(totalPrice + ticket.price);
        }
      }
    }
    dispatch(setConfirmedTickets(selectedTickets));
    dispatch(setFinalPrice(totalPrice));

    
  };

  function convertTo12Hour(time) {
    // If time already contains 'AM' or 'PM', return it as is
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }

    // Otherwise, convert time to 12-hour format
    const [hours, minutes] = time.split(":");
    const hoursIn12HourFormat = hours % 12 || 12;
    const period = hours < 12 ? " AM" : " PM";
    return hoursIn12HourFormat + ":" + minutes + period;
  }

  function getOrdinalSuffix(date) {
    const day = date.getDate();
    if (day % 10 === 1 && day !== 11) {
      return day + "st";
    } else if (day % 10 === 2 && day !== 12) {
      return day + "nd";
    } else if (day % 10 === 3 && day !== 13) {
      return day + "rd";
    } else {
      return day + "th";
    }
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/event/getEvents?slug=${eventSlug}`);
        const data = await res.json();
        
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setEvent(data.event[0]);
          setEventData(data.event);
          
          setLoading(false);
          setError(false);

          // console.log(currentUser._id);
        }
      } catch (error) {
        console.log(error.message);
        setError(true);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventSlug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-12 h-12" />
      </div>
    );
  const handleManageClick = () => {
    navigate("/manage-event");
  };

  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Oufb1SIR9oMWB8a1wc6gZSgOs3m4vTd6DYIup7jE5yyRky351W1nDEPAgzcmXqsuXaNqg1pfFlFall8OAHZZhKR00TpCXsACh"
    );
    // console.log(currentUser?._id, event?._id);
    const prevUser = await axios.get(
      `/api/payment/get-registered-user/${event._id}/${currentUser._id}`
    );
   
   

    if (prevUser?.data?.ok) {
      
      navigate(`/payment-success/${event?._id}/${currentUser?._id}`);
      return;
    }

    const response = await axios.post(
      "/api/payment/register-and-make-payment-session",
      { eventId: event?._id, userId: currentUser?._id }
    );
    // console.log(response);
    if (!prevUser?.data?.ok) {
      const result = stripe.redirectToCheckout({
        sessionId: response?.data?.sessionID,
      });
    }
    // console.log(result);
  };

  return (
    <div className="bg-blue-900 bg-opacity-20">
    <motion.main className=" transition-all duration-1000 p-3 flex flex-col max-w-6xl mx-auto min-h-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}>
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl hover:opacity-70 transiton duration-0.1 cursor-pointer">
        {event && event.title}
      </h1>
      <Link
        to={`/search?location=${event && event.location}`}
        className="self-center mt-3"
      >
        <Button className="flex" color="gray" pill size="lg">
          <ImLocation
            size={30}
            className=" hover:text-zinc-950 dark:hover:text-green-500 transition duration-100"
          />
          <div className="text-2xl hover:opacity-70 transition duration-100">
            {event && event.location}
          </div>
        </Button>
      </Link>

      <img
        src={event && event.image}
        alt={event && event.title}
        className="self-center object-cover   border-blue-800 dark:border-slate-500 border-[4px] rounded-2xl border-opacity-40 w-[70%] h-[400px] xl:max-w-300px max-h-300px mt-10"
      />

      <div className="flex justify-between p-3 border-b border-slate-500 w-full max-w-2xl text-xs mx-auto">
        <span className="text-xl">
          {event &&
            (() => {
              const date = new Date(event.date);
              const dayWithSuffix = getOrdinalSuffix(date);
              const monthYear = date.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              });
              return `${dayWithSuffix} ${monthYear}`;
            })()}
        </span>

        <span className="italic text-xl">
          {event && convertTo12Hour(event.time)}
        </span>
      </div>

      <div
        className="p-3 w-[70%] mx-auto post-content flex justify-center  flex-wrap "
        dangerouslySetInnerHTML={{ __html: event && event.content }}
      ></div>
      <div className="flex flex-col mx-auto sm:flex-row gap-4 justify-center mt-4  border-b border-slate-500 pb-4">
        <FaTicketAlt
          className="hover:rotate-90 transform duration-200 my-auto mx-auto "
          size={30}
        />
        {event && event.tickets.map((ticket, index) => (
  <Button
  className={`max-w-[100px] flex flex-wrap rounded-md  hover:opacity-90  ${selectedTickets.includes(ticket) ? 'selected ' : ''} `}
  key={index}
  color={selectedTickets.includes(ticket) ? "blue" : "gray"}
  
  onClick={() => !currentUser.isAdmin && handleTicketSelect(ticket)}
>
  {ticket.name}
</Button>
))}



      </div>
      {currentUser && !currentUser.isAdmin && (
  <div className="flex text-3xl">
    Total Bill :
    <div className="flex">
      <FaIndianRupeeSign size={25} className="mt-[8px] mr-[2px] ml-[10px]" />
      <div className="mt-[0.5px] transition-all duration-100">{totalPrice}</div>
    </div>
  </div>
)}
      
      <div className="self-center mt-12">
        {currentUser === null ? (
          <Link to="/sign-in">
            <Button color="purple" pill>
              Login To Register
            </Button>
          </Link>
        ) : currentUser.isAdmin ? (
          <div className="justify-center flex w-full -mt-2">
            <Button color="green" pill size="lg" onClick={handleManageClick}>
              Manage Event
            </Button>
          </div>
        ) : (
          <div className="justify-center flex w-full -mt-2">
            <Button color="green" pill size="lg" onClick={handlePayment}>
              Pay/Register
            </Button>
          </div>
        )}
      </div>
    </motion.main>
    </div>
  );
};

export default EventPage;
