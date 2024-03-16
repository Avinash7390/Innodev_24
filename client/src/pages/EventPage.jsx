import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner, Button } from "flowbite-react";
import { FaTicketAlt } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js/pure";
import axios from "axios";

const EventPage = () => {
  const { eventSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [event, setEvent] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [recentEvents, setRecentEvents] = useState(null);
  const [eventData, setEventData] = useState([]);
  const navigate = useNavigate();

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
        console.log(data.event[0]._id);
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
    console.log(prevUser);

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
    <main className="  p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
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
        className="self-center object-cover w-[70%] h-[400px] xl:max-w-300px max-h-300px p-3 mt-10"
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
      <div className="flex gap-4 justify-center mt-4  border-b border-slate-500 pb-4">
        <FaTicketAlt
          className="hover:rotate-90 transform duration-200 my-auto "
          size={30}
        />
        {event &&
          event.tickets.map((ticket, index) => (
            <Button
              className="max-w-[100px] p-1  "
              key={index}
              color="gray"
              pill
              size="xs"
            >
              {ticket.label}
            </Button>
          ))}
      </div>
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
    </main>
  );
};

export default EventPage;
