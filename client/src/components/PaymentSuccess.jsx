import { useParams } from "react-router-dom";
import React from "react";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const { eventId, userId } = useParams();
  // console.log(eventId, userId);

  const registerUser = async () => {
    const res = await axios.post("/api/payment/register-new-user", {
      eventId,
      userId,
    });
    if (res?.data?.ok) {
      setLoading(false);
      setToken(res?.data?.userData?._id);
    } else {
      setLoading(true);
    }
  };
  useEffect(() => {
    try {
      setLoading(true);
      registerUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[100%] transition-all">
          <div className="p-3 flex flex-col gap-2">
            <p className="text-xl font-semibold line-clamp-2">
              Congrats! You have been Registered.
            </p>

            <div className="flex justify-between w-full">
              <span className="italic text-lg">
                Your Check-In ID is : {token}
                <p>You will need this Id in-order to attend the event.</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
