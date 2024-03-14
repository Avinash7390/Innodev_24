import styled from "styled-components";

const ManageEventCompo = styled.section`
  body,
  html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, sans-serif;
  }

  .container {
    display: flex;
    height: 100vh;
  }

  .section {
    width: 50%;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .section h2 {
    margin-left: 40px;
    margin-right: 40px;
  }

  .section1 {
    background: linear-gradient(
      to right,
      #d5e7ff,
      #e6f3ff
    ); /* Gradient from light blue to very light blue */
  }

  .section2 {
    background: linear-gradient(
      to left,
      #ffe0b3,
      #fff9e6
    ); /* Gradient from light orange to very light orange */
  }

  .section::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background: linear-gradient(
      to right,
      #d5e7ff,
      #ffe0b3
    ); /* Gradient from light blue to light orange */
    z-index: -1;
    transition: width 0.3s ease;
  }

  .checkin-form {
    padding: 20px;
    background-color: transparent; /* Removed background color */
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%; /* Adjusted width for the form */
    max-width: 400px; /* Max width for the form */
  }

  .checkin-form h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #7c7e80;
  }

  .checkin-form label {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .checkin-form input {
    margin-bottom: 20px;
    margin-top: 10px;
    padding: 15px; /* Increased padding */
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%; /* Full width input */
    max-width: 100%; /* Ensure input respects its container width */
    transition: border-color 0.3s ease;
    box-sizing: border-box; /* Include padding and border in the total width and height */
    background-color: #e3f1fa;
  }

  .checkin-form input:focus {
    border-color: #007bff; /* Change border color on focus */
  }

  .checkin-form button {
    padding: 15px 20px; /* Increased padding */
    border: none;
    border-radius: 5px;
    background-color: #007bff; /* Bootstrap primary color */
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .checkin-form button:hover {
    background-color: #0056b3; /* Darker shade of primary color on hover */
  }

  .analytics-btn {
    padding: 15px 20px; /* Increased padding */
    margin-right: 15px;
    margin-left: 15px;
    border: none;
    border-radius: 5px;
    background-color: #007bff; /* Bootstrap primary color */
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .analytics-btn:hover {
    background-color: #0056b3; /* Darker shade of primary color on hover */
  }

  /* Responsive Layout */
  @media screen and (max-width: 768px) {
    .container {
      flex-direction: column;
      height: auto;
    }

    .section {
      width: 100%;
    }

    .checkin-form {
      width: 90%; /* Adjusted width for smaller screens */
    }
  }
`;

export default ManageEventCompo;
