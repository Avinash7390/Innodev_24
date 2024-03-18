import React, { useEffect, useState } from "react";
import AttendeeList from "../functionalcomponents/AttendeeList";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import { Table } from "flowbite-react";
import axios from "axios";

const AttendeesList = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { eventId } = useParams();
  const [loader, setLoader] = useState(true);
  const [eventUsers, setEventUsers] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `/api/analytics/event-data/${eventId}`
        );
        if (response?.data?.ok) {
          setLoader(false);
          setEventUsers(response?.data);
          // console.log(response);
        } else {
          setLoader(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, []);

  // console.log(eventUsers);

  const users = eventUsers?.eventData;
  // console.log(users);

  if (loader)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <>
      <div className="overflow-x-auto p-10 m-10">
        <Table>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Amount Paid</Table.HeadCell>
            <Table.HeadCell>Attendance Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.length === 0 ? (
              <h1>No Attendees</h1>
            ) : (
              <>
                {users.map((data, val = 0) => (
                  <>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {++val}
                      </Table.Cell>
                      <Table.Cell>{data && data?.userId?.username}</Table.Cell>
                      <Table.Cell>${data && data?.amount}</Table.Cell>
                      <Table.Cell>Checked-In</Table.Cell>
                    </Table.Row>
                  </>
                ))}
              </>
            )}
          </Table.Body>
        </Table>
      </div>

      {/* <AttendeeList>
        <div className="list-container">
          <h1>Attendees</h1>
          <div className="list-table">
            <div className="list-header">
              <span>Id</span>
              <span>Name</span>
              <span>Amount</span>
              <span>Attendance Status</span>
            </div>
            <ul className="list-body">
              {users?.length === 0 ? (
                <>
                  <h1>No Attendee Yet!</h1>
                </>
              ) : (
                <>
                  {users?.map((data, val = 0) => (
                    <>
                      <li>
                        <span>{++val}</span>
                        <span>{data && data?.userId?.username}</span>
                        <span>{data && data?.amount}</span>
                        <span>Checked-In</span>
                      </li>
                    </>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </AttendeeList> */}
    </>
  );
};

export default AttendeesList;
