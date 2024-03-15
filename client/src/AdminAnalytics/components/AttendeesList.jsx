import React from "react";
import AttendeeList from "../functionalcomponents/AttendeeList";

const AttendeesList = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <AttendeeList>
        <div class="list-container">
          <h1>Attendees</h1>
          <div class="list-table">
            <div class="list-header">
              <span>Id</span>
              <span>Name</span>
              <span>Ticket Type</span>
              <span>Amount</span>
              <span>Attendance Status</span>
            </div>
            <ul class="list-body">
              {arr.map((data) => (
                <>
                  <li>
                    <span>{data}</span>
                    <span>John Doe</span>
                    <span>VIP</span>
                    <span>$100</span>
                    <span>Checked-In</span>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </div>
      </AttendeeList>
    </>
  );
};

export default AttendeesList;
