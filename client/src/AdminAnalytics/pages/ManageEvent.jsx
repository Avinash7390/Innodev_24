import React, { useState } from "react";
import ManageEventCompo from "../functionalcomponents/ManageEventCSS";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ManageEvent = () => {
  const { eventId } = useParams();
  const [regNo, setRegNO] = useState("");
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(regNo);
    try {
      const res = await axios.post("/api/attendance/mark-attendance", {
        registrationNo: regNo,
        eventId: eventId,
      });
      setResponse(res);
      if (res?.data?.ok) {
        console.log("Marked SuccessFully");
        toast(res?.data?.message);
      } else {
        console.log(res?.data?.message);
        toast(res?.data?.message);
      }
      setRegNO("");
    } catch (err) {
      console.log(err?.response);
      toast("Not A valid ID");
    }
  };

  const handleClick = () => {
    navigate(`/single-event-analytics/${eventId}`);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0 p-7">
          <Card className="max-w-lg">
            <form className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="text" value="Enter Attendee's Check-In ID" />
                </div>
                <TextInput
                  id="regNo"
                  type="text"
                  placeholder="Check-In ID"
                  required
                  value={regNo}
                  onChange={(e) => setRegNO(e.target.value)}
                />
              </div>
              <Button type="submit" onClick={handleSubmit}>
                Check-In An Attendee
              </Button>
              <ToastContainer />
            </form>
          </Card>
        </div>
        <div className="w-full sm:w-1/2 p-7">
          <Card className="max-w-lg">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Want to know more about this event?
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              By clicking below button you can see the detailed analysis of the
              event as Total Revenue, Total Attendees and other statistical data
            </p>
            <Button onClick={handleClick}>
              Go to Analytics
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
        </div>
      </div>
    </>
    // <ManageEventCompo>
    //   <div className="container">
    //     <div className="section section1">
    //       <h2>Event Name : Name</h2>
    //       <form className="checkin-form" onSubmit={handleSubmit}>
    //         <h2>Check-in Participant</h2>
    //         <label htmlFor="participantName">Registration Number Please!</label>
    //         <input
    //           type="text"
    //           id="regNo"
    //           name="RegNo"
    //           value = {regNo}
    //           onChange={(e) => setRegNO(e.target.value)}
    //           placeholder="Enter Registration Number"
    //           required
    //         />
    //         <button type="submit">CheckIn</button>
    //       </form>
    //     </div>
    //     <div className="section section2">
    //       <h2>Event Description : Event Description (This is Dummy event)</h2>
    //       <button className="analytics-btn" onClick={handleClick}>
    //         Go to Analytics
    //       </button>
    //       <p>Explore the Event</p>
    //     </div>
    //   </div>
    // </ManageEventCompo>
  );
};

export default ManageEvent;
