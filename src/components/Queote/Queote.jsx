import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const QueoteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  width: 40%;
`;

const QueoteDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
`;

const QueoteSpan = styled.span`
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
  font-size: 1.2rem;
`;

const QueoteBtn = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const Queote = () => {
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const getQueote = async () => {
    const data = await axios.get(`https://api.quotable.io/random`, {
      params: { maxLength: 50 },
    });

    setData(data.data);
  };

  useEffect(() => {
    getQueote();
  }, []);

  useEffect(() => {
    setContent(data.content);
    setAuthor(data.author);
  }, [data]);

  const onClick = () => {
    getQueote();
  };

  return (
    <QueoteContainer>
      <QueoteDiv>
        <QueoteSpan>{content}</QueoteSpan>
        <QueoteSpan>-{author}</QueoteSpan>
      </QueoteDiv>
      <QueoteBtn onClick={onClick}>
        <FontAwesomeIcon icon={faSyncAlt} />
      </QueoteBtn>
    </QueoteContainer>
  );
};

export default Queote;
