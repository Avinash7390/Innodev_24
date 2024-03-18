import styled from "styled-components";

const AttendeeList = styled.section`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f7f7f7;
  }

  .list-container {
    width: 80%;
    margin: 50px auto;
    text-align: center;
  }

  h1 {
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .list-table {
    border-collapse: collapse;
    width: 100%;
  }

  .list-header {
    background-color: #333;
    color: white;
  }

  .list-header span {
    display: inline-block;
    width: calc(100% / 4);
    padding: 10px 0;
    text-align: center;
  }

  .list-body li {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
  }

  .list-body li:last-child {
    border-bottom: none;
  }

  .list-body li span {
    flex: 1;
    padding: 15px 0;
    text-align: center;
  }

  .list-body li:nth-child(even) {
    background-color: #f2f2f2;
  }

  @media screen and (max-width: 768px) {
    .list-container {
      width: 90%;
    }
  }
`;

export default AttendeeList;
