import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

let utc = require("dayjs/plugin/utc");
let timezone = require("dayjs/plugin/timezone");
let dayOfYear = require("dayjs/plugin/dayOfYear");
let weekOfYear = require("dayjs/plugin/weekOfYear");

const InfoDiv = styled.div`
  position: absolute;
  bottom: 0;
  height: 200px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  @media all and (max-width: 479px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem;
  margin-left: 10%;
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 1.5rem;
  }
  @media all and (max-width: 479px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-left: 0%;
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media all and (max-width: 479px) {
    width: 70%;
    margin-right: 50px;
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.7rem;
  color: white;
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.2rem;
  }
  @media all and (max-width: 479px) {
    font-size: 0.8rem;
  }
`;

const Data = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.8rem;
  }
  @media all and (max-width: 479px) {
    font-size: 0.8rem;
  }
`;
const InfoSection = () => {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  dayjs.extend(dayOfYear);
  dayjs.extend(weekOfYear);

  const time = dayjs().format("YYYY-MM-DD");
  const valueOfdayOfYear = dayjs(time).dayOfYear();
  const location = useState(dayjs.tz.guess());
  const dayOfWeek = dayjs().day();
  const valueOfWeekOfYear = dayjs(time).week();

  return (
    <InfoDiv>
      <Side>
        <Section>
          <Title>Current Timezone</Title>
          <Data>{location}</Data>
        </Section>
        <Section>
          <Title>Day of the year</Title>
          <Data>{valueOfdayOfYear}</Data>
        </Section>
      </Side>
      <Side>
        <Section>
          <Title>Day of the week</Title>
          <Data>{dayOfWeek}</Data>
        </Section>
        <Section>
          <Title>Week number </Title>
          <Data>{valueOfWeekOfYear}</Data>
        </Section>
      </Side>
    </InfoDiv>
  );
};

export default InfoSection;
