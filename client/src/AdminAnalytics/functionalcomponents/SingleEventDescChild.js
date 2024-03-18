import styled from "styled-components";

const SingleEventDescChildWrapper = styled.article`
  padding: 2rem;
  background: #ceeff2;
  border-radius: 10px;
  margin-top: 20px;
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: #098d99;
    font-weight: bold;
    font-size: 1.5rem;
  }
  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
  .time {
    font-family: verdana;
    font-weight: bold;
    color: #098d99;
  }
  .date {
    font-family: verdana;
    font-weight: bold;
    margin-right: 10px;
    color: #098d99;
  }
  .attendees {
    text-decoration: none;
    color: #f5f8fa;
    font-family: roboto;
    background: #072742;
    font-size: 25px;
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .attendees span {
    margin: 10px 10px 10px 10px;
  }
  .Desc {
    margin-top: 10px;
    margin-bottom: 10px;
    color: #098d99;
  }
  .venue {
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #098d99;
  }
`;

export default SingleEventDescChildWrapper;
