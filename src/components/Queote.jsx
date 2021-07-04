import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const QueoteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
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
  @media all and (max-width: 479px) {
    font-size: 0.8rem;
  }
`;

const QueoteBtn = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  @media all and (max-width: 479px) {
    margin-right: 10px;
  }
`;

const Queote = () => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const getQueote = async () => {
    const {
      data: { content, author },
    } = await axios.get(`https://api.quotable.io/random`, {
      params: { maxLength: 50 },
    });
    setAuthor(author);
    setContent(content);
    return { content, author };
  };

  useEffect(() => {
    getQueote();
  }, []);

  const handleClick = () => {
    getQueote();
  };

  return (
    <QueoteContainer>
      <QueoteDiv>
        <QueoteSpan>{content}</QueoteSpan>
        <QueoteSpan>-{author}</QueoteSpan>
      </QueoteDiv>
      <QueoteBtn onClick={handleClick}>
        <FontAwesomeIcon icon={faSyncAlt} />
      </QueoteBtn>
    </QueoteContainer>
  );
};

export default Queote;
