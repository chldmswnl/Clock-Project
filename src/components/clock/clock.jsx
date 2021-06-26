import React from "react";
import styled from "styled-components";
import TimeSection from "../TimeSection/TimeSection";
import Queote from "../Queote/Queote";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import InfoSection from "../InfoSection/InfoSection";
import axios from "axios";
let utc = require("dayjs/plugin/utc");
let timezone = require("dayjs/plugin/timezone");

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${(props) =>
    props.day ? "/img/day.jpg" : "/img/night.jpg"});
  background-size: cover;
`;
const TimeDiv = styled.div`
  margin-top: 10%;
  margin-left: 5%;
`;
const Welcome = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Location = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
`;

const ToggleButton = styled.button`
  border-radius: 20px;
  width: 100px;
  height: 20x;
  padding: 10px;
  border: none;
  background-color: white;
  font-weight: bold;
  color: #545452;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Clock = () => {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const [regionName, setRegionName] = useState("");
  const [city, setCity] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [hour, setHour] = useState(parseInt(dayjs().format("HH")));
  const [day, setDay] = useState(true);
  const [btnName, setBtnName] = useState("More");
  const [welcomeString, setWelcomeString] = useState("");
  const [openInfoSection, SetOpenInfoSection] = useState(false);
  const getMyPosition = async () => {
    const data = await axios.get(`http://ip-api.com/json`);
    setLocationData(data.data);
  };

  useEffect(() => {
    getMyPosition();
  }, []);

  useEffect(() => {
    setRegionName(locationData.regionName);
    setCity(locationData.city);
  }, [locationData]);

  useEffect(() => {
    if (hour > 6 && hour < 18) {
      setWelcomeString("Good morning 🌞");
      setDay(true);
    } else {
      setWelcomeString("Good evening 🌜");
      setDay(false);
    }
  }, [hour]);

  const onClick = (e) => {
    SetOpenInfoSection(!openInfoSection);
    openInfoSection ? setBtnName("More") : setBtnName("Close");
  };

  return (
    <>
      <Container day={day}>
        <TimeDiv>
          <Queote />
          <Welcome>{welcomeString} It's currently</Welcome>
          <div>
            <TimeSection />
            <ToggleButton onClick={onClick}>{btnName}</ToggleButton>
          </div>
          <Location>
            In {regionName}, {city}
          </Location>
        </TimeDiv>
        {openInfoSection && <InfoSection />}
      </Container>
    </>
  );
};

export default Clock;
