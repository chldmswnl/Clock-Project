import React from "react";
import styled from "styled-components";
import TimeSection from "./TimeSection";
import Queote from "./Queote";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import InfoSection from "./InfoSection";
import axios from "axios";

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

const WrappedTime = styled.div`
  display: flex;
  flex-direction: column;
`;
const TimeDiv = styled.div`
  margin-top: 7%;
  margin-left: 5%;
  display: flex;
  align-items: center;
  @media (min-width: 480px) and (max-width: 767px) {
    flex-direction: column;
    margin-left: 0%;
  }
  @media all and (max-width: 479px) {
    flex-direction: column;
  }
`;
const Welcome = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  @media all and (max-width: 479px) {
    font-size: 1rem;
  }
`;

const Location = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  @media all and (max-width: 479px) {
    font-size: 1rem;
  }
`;

const ToggleButton = styled.button`
  border-radius: 20px;
  width: 100px;
  height: 40px;
  border: none;
  background-color: white;
  font-weight: bold;
  color: #545452;
  cursor: pointer;
  margin-top: 250px;
  @media (min-width: 480px) and (max-width: 767px) {
    margin-top: 50px;
  }
  @media all and (max-width: 479px) {
    margin-top: 30px;
    width: 60px;
    height: 30px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Clock = () => {
  let hour = parseInt(dayjs().format("HH"));
  const [regionName, setRegionName] = useState("");
  const [city, setCity] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [day, setDay] = useState(true);
  const [btnName, setBtnName] = useState("More");
  const [welcomeString, setWelcomeString] = useState("");
  const [openInfoSection, SetOpenInfoSection] = useState(false);

  const getMyPosition = async () => {
    const { data } = await axios.get(`http://ip-api.com/json`);
    setLocationData(data);
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
          <WrappedTime>
            <Queote />
            <Welcome>{welcomeString} It's currently</Welcome>
            <TimeSection />
            <Location>
              In {regionName}, {city}
            </Location>
          </WrappedTime>
          <ToggleButton onClick={onClick}>{btnName}</ToggleButton>
        </TimeDiv>
        {openInfoSection && <InfoSection />}
      </Container>
    </>
  );
};

export default Clock;
