import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useState } from "react";

const Time = styled.span`
  color: white;
  font-weight: bold;
  font-size: 7rem;
  margin-right: 3rem;
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 5rem;
  }
  @media all and (max-width: 479px) {
    font-size: 3rem;
  }
`;

const TimeSection = () => {
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));

  setInterval(() => {
    setTime(dayjs().format("HH:mm:ss"));
  }, 1000);

  return (
    <>
      <Time>{time}</Time>
    </>
  );
};

export default TimeSection;
